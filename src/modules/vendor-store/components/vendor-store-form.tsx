import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/file-uploader";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Store } from "@/types/store";
import TagManager from "./vendor-tag-input";
import { convertFileToUrl, getBase64 } from "@/lib/utils";
import { getChangedValues } from "@/utils/get-changed-values";
import { FaSpinner } from "react-icons/fa";
import { useUpdateStore } from "../mutations/update-store";
import { useToast } from "@/hooks/use-toast";

interface VendorStoreProps {
  vendorStoreData?: Store;
}

// Define FormValues to match our form structure
type FormValues = {
  name: string;
  email: string;
  telephone?: string;
  address: string;
  billboard?: File[] | string;
  logo?: File[] | string;
  preparationTime?: string;
  openingTime?: string;
  closingTime?: string;
  tags?: string[];
  isActive: boolean;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  telephone: z.string().optional(),
  address: z.string().min(1, {
    message: "Address must not be empty",
  }),
  billboard: z.any().optional(),
  logo: z.any().optional(),
  preparationTime: z.string().optional(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean(),
});

const VendorStoreForm = ({ vendorStoreData }: VendorStoreProps) => {
  const { mutateAsync: updateStore, isPending } = useUpdateStore(
    String(vendorStoreData?.id)
  );
  const { toast } = useToast();

  const [billboardFiles, setBillboardFiles] = useState<File[]>([]);
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>(vendorStoreData?.tags || ["All"]);

  const defaultFormValues = {
    name: vendorStoreData?.name || "",
    email: vendorStoreData?.email || "",
    telephone: vendorStoreData?.telephone || "",
    address: vendorStoreData?.address || "",
    billboard: vendorStoreData?.billboard || "",
    logo: vendorStoreData?.logo || "",
    preparationTime: vendorStoreData?.preparationTime || "",
    openingTime: vendorStoreData?.openingTime || "",
    closingTime: vendorStoreData?.closingTime || "",
    tags: vendorStoreData?.tags || ["All"],
    isActive: vendorStoreData?.isActive || true,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  // Update form when tags change
  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);

  // Handle fetching existing images if they're URLs
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Handle billboard image
        if (
          vendorStoreData?.billboard &&
          typeof vendorStoreData.billboard === "string"
        ) {
          const response = await fetch(vendorStoreData.billboard);
          if (response.ok) {
            const blob = await response.blob();
            const file = new File([blob], "billboard.jpg", {
              type: blob.type,
            });
            setBillboardFiles([file]);
          }
        }

        // Handle logo image
        if (vendorStoreData?.logo && typeof vendorStoreData.logo === "string") {
          const response = await fetch(vendorStoreData.logo);
          if (response.ok) {
            const blob = await response.blob();
            const file = new File([blob], "logo.jpg", {
              type: blob.type,
            });
            setLogoFiles([file]);
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (vendorStoreData) {
      fetchImages();
    }
  }, [vendorStoreData]);

  const initialValues = useMemo(() => defaultFormValues, []);

  const onSubmit = async (values: FormValues) => {
    const billboardValue = values.billboard && values.billboard[0];
    const logoValue = values.logo && values.logo[0];

    const formData = new FormData();
    const currentValues = form.getValues();
    const changedValues = getChangedValues<FormValues>(
      initialValues,
      currentValues
    );

    // Append only changed values to formData
    Object.entries(changedValues).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          // Handle arrays (tags)
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          // Handle File objects
          formData.append(key, value);
        } else {
          // Handle strings and booleans
          formData.append(key, value.toString());
        }
      }
    });

    // Handle file uploads separately
    if (billboardValue && billboardValue instanceof File) {
      formData.append("billboard", billboardValue);
    }
    if (logoValue && logoValue instanceof File) {
      formData.append("logo", logoValue);
    }

    try {
      await updateStore(formData);
      toast({
        title: "Success",
        description: "Vendor store updated successfully!",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // For debugging
  // console.log("Form errors:", form.formState.errors);

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Store name" {...field} />
                </FormControl>
                <FormDescription>Input the name of your store</FormDescription>
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
                    placeholder="Store email address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Input the email address of your store
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input placeholder="Store telephone number" {...field} />
                </FormControl>
                <FormDescription>
                  Input the phone contact number of your store
                </FormDescription>
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
                  <Input placeholder="Store address" {...field} />
                </FormControl>
                <FormDescription>
                  Input the physical address of your store
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billboard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <FormControl>
                  <FileUploader
                    files={billboardFiles}
                    onChange={(files) => {
                      setBillboardFiles(files);
                      field.onChange(files);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload the billboard image of your store. The billboard image
                  is the header image of your store
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <FileUploader
                    files={logoFiles}
                    onChange={(files) => {
                      setLogoFiles(files);
                      field.onChange(files);
                    }}
                  />
                </FormControl>
                <FormDescription>Upload your store logo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation Time</FormLabel>
                <FormControl>
                  <Input placeholder="30 - 45 min" {...field} />
                </FormControl>
                <FormDescription>
                  The preparation time is the time range it takes (in minutes)
                  for food from your store to be ready.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="openingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opening Time</FormLabel>
                <FormControl>
                  <Input placeholder="9:00 am" {...field} />
                </FormControl>
                <FormDescription>
                  The opening time is the time the store opens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing Time</FormLabel>
                <FormControl>
                  <Input placeholder="10:00 pm" {...field} />
                </FormControl>
                <FormDescription>
                  The closing time is the time the store closes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagManager
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      field.onChange(newTags);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Add tags for the products in the store.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Active</FormLabel>
                  <FormDescription>
                    This shows whether the store is active for orders or not.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full sm:w-auto">
            {isPending ? (
              <>
                Submitting
                <span className="ml-2 text-sm">
                  <FaSpinner className="animate-spin" />
                </span>
              </>
            ) : (
              <>Update Store Information </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VendorStoreForm;
