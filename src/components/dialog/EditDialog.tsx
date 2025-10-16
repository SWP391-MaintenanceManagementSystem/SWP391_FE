import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type FieldValues, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";

interface EditDialogProps<TFormValues extends FieldValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: TFormValues) => void;
  form: ReturnType<typeof useForm<TFormValues>>;
  children: React.ReactNode;
  styleFormLayout?: string;
  styleLayoutFooter?: string;
  title: string;
}

export function EditDialog<TFormValues extends FieldValues>({
  open,
  onOpenChange,
  onConfirm,
  form,
  children,
  styleFormLayout,
  styleLayoutFooter,
  title,
}: EditDialogProps<TFormValues>) {
  const onSubmit = async (values: TFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    onConfirm(values);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-inter md:min-h-40 md:max-w-[720px] space-y-6 min-w-[300px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit {title} Infomations</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to {title} here. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("grid grid-cols-1 gap-6", styleFormLayout)}
          >
            {children}
            <AlertDialogFooter
              className={cn("flex flex-row justify-end", styleLayoutFooter)}
            >
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="!outline-none"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>

              <Button
                type="submit"
                className="!outline-none bg-purple-primary"
                disabled={!form.formState.isDirty}
              >
                Save Changes
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
