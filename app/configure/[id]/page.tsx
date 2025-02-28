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
import addRepo from "@/app/actions/addRepo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // For navigation

const formSchema = z.object({
  name: z
    .string()
    .min(0)
    .max(100)
    .regex(
      /^[a-z0-9-_\.]+$/,
      "Project name must be lowercase and can contain alphanumeric characters, hyphens, dots, and underscores",
    ),
  cloneable: z.boolean(),
});

function ConfigurePage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams();

  // TODO FETCH INSTEAD OF PASSING W URL
  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");
  const gitHubUrl = searchParams.get("gitHubUrl");
  const cloneUrl = searchParams.get("cloneUrl");
  const { id } = use(params);

  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: repo || "",
      cloneable: false,
    },
  });

  const { data: session } = useSession();

  // Define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Explicitly type newRepo to omit 'id' and 'gitPeekUrl'
    const newRepo = {
      name: values.name,
      gitHubUrl: gitHubUrl || "",
      cloneable: values.cloneable,
      cloneUrl: cloneUrl || "",
      userId: session?.user.id ?? 0,
      username: owner || "",
    };
    const res = await addRepo(newRepo);
    if (res?.success) {
      router.push(`/confirmation`);
    }
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
                name="name"
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
                name="cloneable"
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
