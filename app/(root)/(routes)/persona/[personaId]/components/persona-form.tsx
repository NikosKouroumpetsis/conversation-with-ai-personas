"use client";
import * as z from "zod";
import { Persona, Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `You are a programmer character whose name is Nick. You are a architect in web develop general and have a master at Vue 3 and React.JS. You have a passion for new technologies, programming Languages, AI technology and help the others with programming problems. You are currently talking to a human who has problem with with work at his or her compoany. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited to help with your knowledge.
`;

const SEED_CHAT = `Human: Hi Nick, how's your day been?
Nick: Busy as always. Between coding and helping the others at complete the projects we are working, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with the Staff you recruit the last two months?
Nick: We're making strides! Our goal is to make them Full-stack developers. We are at start for their first steps at node and express and in Vue 3. 

Human: Nick i need your help with some problems i have. Could you help me a bit?
Nick: Absolutely! what are the problems you have? In back-end or in Front-end?

Human: I have problems with the Onion Architecture design in back-end and with the authentication with the sms verification. What you do think i should do to undrestand the Onion for start?
Nick: Sure, I'll break down the problem into two parts: Understanding Onion Architecture.

Understanding Onion Architecture
Onion Architecture is a design pattern that is often used in Domain-Driven Design. It emphasizes the separation of concerns by organizing code into different layers, with the innermost layer typically containing the domain logic, and outer layers responsible for things like persistence, UI, and API. Here's a step-by-step guide to understanding and implementing Onion Architecture:

Learn the Basics: Start by understanding the key concepts of Onion Architecture, including the various layers like Domain, Application, Infrastructure, etc.

Study Existing Examples: There are many open-source projects that implement Onion Architecture. Studying these can provide practical insights.

Domain Centered: Focus on the domain logic. In Onion Architecture, the domain is at the core, and everything else depends on it. Get a solid understanding of your business rules and entities.

Dependency Inversion: Understand how dependency inversion works, as dependencies should point inwards toward the core, not outwards.

Implement Gradually: Try implementing Onion Architecture in a smaller project first. Practice separating concerns into different layers and managing dependencies.

Consider Using a Framework: Some frameworks might ease the implementation of Onion Architecture in your particular programming language.

Consult Documentation and Tutorials: Look for specific tutorials, books, or courses that cover Onion Architecture in the language and framework you are using.
`;

interface PersonaFormProps {
  initialData: Persona | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instruction: z.string().min(200, {
    message: "Instructions is required at least 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed is required at least 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export default function PersonaForm({
  categories,
  initialData,
}: PersonaFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instruction: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update Persona functionality
        await axios.patch(`/api/persona/${initialData.id}`, values);
      } else {
        // create Persona functionality
        await axios.post("/api/persona", values);
      }

      toast({
        description: "Success.",
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your Persona
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nick Kourou..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Persona will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Master of Front-end in Next.js And Nuxt 3"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Persona
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormDescription>
                      Select a category for your AI Persona
                    </FormDescription>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detail instructions for AI behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instruction"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your Persona&apos;s backstory and relevant
                  details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example discussion</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail yor discussion with your Persona&apos;s
                  with details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your Persona" : "Create your Persona"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
