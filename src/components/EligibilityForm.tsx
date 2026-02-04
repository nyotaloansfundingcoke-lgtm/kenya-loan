import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LOAN_TYPES } from "@/types/loan";
import type { UserData } from "@/types/loan";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  phoneNumber: z
    .string()
    .regex(/^(07|01)\d{8}$/, "Enter a valid Kenyan phone number (e.g., 0712345678)"),
  idNumber: z
    .string()
    .regex(/^\d{7,8}$/, "Enter a valid ID number (7-8 digits)"),
  loanType: z.string().min(1, "Please select a loan type"),
});

type FormValues = z.infer<typeof formSchema>;

interface EligibilityFormProps {
  onSubmit: (data: UserData) => void;
}

export function EligibilityForm({ onSubmit }: EligibilityFormProps) {
  const [isChecking, setIsChecking] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      idNumber: "",
      loanType: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsChecking(true);
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsChecking(false);
    onSubmit({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      idNumber: data.idNumber,
      loanType: data.loanType,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
          Check Your Loan Eligibility
        </h2>
        <p className="text-muted-foreground">
          Find out how much you qualify for instantly
        </p>
        <p className="mt-2 text-lg font-semibold text-primary">
          Ksh 1,500 – 60,000
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0712345678"
                    className="h-12"
                    maxLength={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your ID number"
                    className="h-12"
                    maxLength={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Loan Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LOAN_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isChecking}
            className="btn-primary-lg w-full text-primary-foreground"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin-slow" />
                Verifying your details...
              </>
            ) : (
              "Check Eligibility"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
