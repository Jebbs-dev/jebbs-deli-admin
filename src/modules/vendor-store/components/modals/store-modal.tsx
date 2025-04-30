"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/state-store/vendor-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateStore } from "../../mutations/add-store";
import useAuthStore from "@/state-store/auth";
import { useUpdateVendor } from "../../mutations/update-vendor";
import { Store, StoreCreate } from "@/types/store";

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string(),
});
const StoreModal = () => {
  const storeModal = useStoreModal();
  const { mutateAsync: createStore } = useCreateStore();
  const { vendor } = useAuthStore();
  const { mutateAsync: updateVendor } = useUpdateVendor(String(vendor?.id));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const storeData: StoreCreate = {
      name: values.name,
      email: values.email,
      address: values.address,
    };

    await updateVendor({
      store: storeData,
    });

    storeModal.onClose();
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Vendor Store"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Store email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Store delivery address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button variant="outline" onClick={storeModal.onClose}>
                Cancel
              </Button>
              <Button
                // disabled={isPending}
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
