import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface WaitlistProps {
  children: React.ReactNode;
}

const schema = z.object({
  email: z.string().email(),
  price: z.string(),
});

const prices = [
  "$20 - $40",
  "$40 - $60",
  "$60 - $80",
  "$80 - $100",
  "$100 - $150",
];

type SchemaType = z.infer<typeof schema>;

const Waitlist = ({ children }: WaitlistProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const form = useForm<SchemaType>({
    defaultValues: {
      email: "",
      price: "",
    },
    resolver: zodResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: SchemaType) => {
    const description = Object.entries(data)
      .map((value) => `${value[0]}: ${value[1]}`)
      .join("\n");

    const response = await fetch(
      "https://discordapp.com/api/webhooks/1322323724937986168/FuJnhP8ZQqjfyYNc-o9yMc2Vxx0CP0-TYBdijhB7Byzd_YJuZyHaw07vWVM6jpyaNvni",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "Message Received",
          tts: false,
          color: "white",
          embeds: [
            {
              title: "Contact Form",
              description,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      toast.success("Confirm! Well received");
      form.reset();
      setIsOpened(false);
    } else {
      toast.error("Oups Error! Try again");
    }
  };

  return (
    <Dialog open={isOpened} openChange={setIsOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Ground Pro</DialogTitle>
          <DialogDescription>
            Animated components build for performance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        disabled={isSubmitting}
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
                    <FormLabel>What will you pay</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your price range you'll want to pay" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prices.map((price) => (
                          <SelectItem key={price} value={price}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Waitlist;
