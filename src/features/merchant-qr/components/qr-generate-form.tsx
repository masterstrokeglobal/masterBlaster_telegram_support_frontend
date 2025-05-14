"use client";

import FormInput from "@/components/form/form-input";
import FormSwitch from "@/components/form/form-switch";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { merchantQrFormSchema, MerchantQrFormValues } from "../type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FormQrUpiExtractor from "@/components/ui/form-upi-extractor";

interface QRGenerateFormProps {
  onSubmit: (values: MerchantQrFormValues) => Promise<void>;
  isGenerating: boolean;
  title?: string;
  description?: string;
  defaultValues?: Partial<MerchantQrFormValues>;
}

export const QRGenerateForm = ({
  onSubmit,
  isGenerating,
  defaultValues,
  title = "Generate New QR Code",
  description = "Create a new QR code for your bank account",
}: QRGenerateFormProps) => {
  const form = useForm<MerchantQrFormValues>({
    resolver: zodResolver(merchantQrFormSchema),
    defaultValues: {
      accountName: defaultValues?.accountName ?? "",
      accountNumber: defaultValues?.accountNumber ?? "",
      bankName: defaultValues?.bankName ?? "",
      upiId: defaultValues?.upiId ?? "",
      ifscCode: defaultValues?.ifscCode ?? "",
      isActive: defaultValues?.isActive ?? true,
      qrLimit: defaultValues?.qrLimit ?? "10000",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="account">
              <AccordionTrigger>Account</AccordionTrigger>
              <AccordionContent>
                <FormInput
                  control={form.control}
                  name="accountName"
                  label="Account Name"
                />

                <FormInput
                  control={form.control}
                  name="accountNumber"
                  label="Account Number"
                />

                <FormInput
                  control={form.control}
                  name="bankName"
                  label="Bank Name"
                />

                <FormInput
                  control={form.control}
                  name="ifscCode"
                  label="IFSC Code"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <FormInput control={form.control} name="upiId" label="UPI ID" />

          <FormQrUpiExtractor
            control={form.control}
            name="upiId"
            label="UPI ID"
          />

          <FormInput control={form.control} name="qrLimit" label="QR Limit" />

          <FormSwitch
            control={form.control}
            name="isActive"
            label="Active Status"
            description="Set whether this QR code is active"
          />

          <DialogFooter>
            <Button
              variant="outline"
              type="submit"
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
