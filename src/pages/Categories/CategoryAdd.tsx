"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Title from "@/components/ui/title";

// Define the schema for form validation
const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  categoryLimit: z
    .number({ invalid_type_error: "Account amount must be a number." })
    .positive("Account amount must be a positive number.")
    .or(z.string().regex(/^\d+$/, "Account amount must be a valid number.")),
});

const CategoryAdd: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: "",
      categoryLimit: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
  }

  return (
    <div className="flex flex-col space-y-6">
      <Title name="Add Category" />

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* Account Name Field */}
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Amount Field */}
          <FormField
            control={form.control}
            name="categoryLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Limit</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category limit"
                    type="number"
                    {...field}
                  />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant={'default'} className='m-4 py-6 w-[90vw]'>
            Add Category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryAdd;
