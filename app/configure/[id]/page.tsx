"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/app/components/NavBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { use } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  projectName: z.string().min(3).max(32),
  allowCloning: z.boolean(),
});

function ConfigurePage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");
  const { id } = use(params);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: repo || "",
      allowCloning: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center">
          <h1 className="text-2xl font-semibold mb-3">Configure project</h1>
          <p>Configure your project and deploy it</p>
        </div>
        <div className="flex flex-col gap-4 max-w-lg px-6 py-8 border border-zinc-200 rounded-sm w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Project name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowCloning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="font-bold">Allow cloning</FormLabel>
                      <FormDescription>
                        Allow users with project link to clone repository
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                <Link
                  href={{
                    pathname: `/content`,
                    query: { id: id, repo: repo, owner: owner },
                  }}
                >
                  Deploy repository
                </Link>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ConfigurePage;
