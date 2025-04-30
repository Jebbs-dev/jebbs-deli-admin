"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { convertFileToUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/modules/products/data/categories";
import { Checkbox } from "@/components/ui/checkbox";
import FileUploader from "@/components/file-uploader";
import { size } from "../../data/size";
import { Product } from "@/types/products";
import { useUpdateProduct } from "../../mutations/update-product";
import { getChangedValues } from "@/utils/get-changed-values";
import { FaSpinner } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must not be less than 2 characters"),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .min(1, "Price must not be less than or equal to zero"),
  image: z.custom<File[]>().optional(),
  stock: z.coerce.number(),
  category: z.string().min(2),
  size: z.any().optional(),
  storeTag: z.string().optional(),
  isAvailable: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductProps {
  product: Partial<Product>;
  productId: string;
}

const ProductForm = ({ product, productId }: ProductProps) => {
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct(productId);
  const { toast } = useToast();

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const defaultFormValues = {
    name: product?.name || "",
    description: product?.description || "",
    image: imageFiles,
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || "",
    size: product?.size || "",
    storeTag: product?.storeTag || "",
    isAvailable: product?.isAvailable || false,
    isFeatured: product?.isFeatured || false,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (product?.image && typeof product?.image === "string") {
        const response = await fetch(product?.image);
        const blob = await response.blob();
        const file = new File([blob], "uploaded_image.jpg", {
          type: blob.type,
        });
        setImageFiles([file]);
      }
    };

    fetchImage();
  }, [product?.image]);

  useEffect(() => {
    form.reset(defaultFormValues);
  }, [form]);

  const initialValues = useMemo(() => defaultFormValues, []);

  const onSubmit = async (values: ProductFormValues) => {
    const imageValue = values.image && values.image[0];

    const formData = new FormData();
    const currentValues = form.getValues();
    const changedValues = getChangedValues<ProductFormValues>(
      initialValues,
      currentValues
    );

    Object.entries(changedValues).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          // Handle arrays (tags)
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          // Handle File objects
          value = imageValue;
          formData.append(key, value);
        } else {
          // Handle strings and booleans
          formData.append(key, value.toString());
        }
      }
    });

    if (imageValue && imageValue instanceof File) {
      formData.append("image", imageValue);
    }

    // formData.append("name", values.name);
    // formData.append("description", values.description || "");
    // formData.append("price", values.price.toString());
    // formData.append("stock", values.stock.toString());
    // formData.append("category", values.category);
    // formData.append("size", values.size || "");
    // formData.append("isAvailable", values.isAvailable ? "true" : "false");
    // formData.append("isFeatured", values.isFeatured ? "true" : "false");

    // console.log(imageValue);

    // const formProps = Object.fromEntries(formData);
    // console.log("FormProps", formProps);
    try {
      await updateProduct(formData);
      toast({
        title: "Success",
        description: "Updated product successfully!",
      });
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }

    // await updateProduct(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  files={imageFiles}
                  onChange={(files) => {
                    setImageFiles(files);
                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="9.99" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      // value={field.value}
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {size.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeTag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Tag</FormLabel>
              <FormControl>
                <Input placeholder="Store tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available</FormLabel>
                <FormDescription>
                  This product will appear in the shop. If unchecked, the
                  product will be shown as out-of-stock in the shop.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Featured</FormLabel>
                <FormDescription>
                  This product will appear in the shop. If unchecked, the
                  product will not be displayed in the shop.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? (
            <>
              Submitting
              <span className="ml-2 text-sm">
                <FaSpinner className="animate-spin" />
              </span>
            </>
          ) : (
            <>Submit </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
