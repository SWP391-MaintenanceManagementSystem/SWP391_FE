import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import type { ForgotPasswordFormData } from "../lib/schema"



type ForgotPasswordFormProps = {
    form: ReturnType<typeof useForm<ForgotPasswordFormData>>;
    onSubmit: (data: ForgotPasswordFormData) => void;
}


export const ForgotPasswordForm = ({ form, onSubmit }: ForgotPasswordFormProps) => {

    return (
        <div className="space-y-6  lg:w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} className="h-10 py-2" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-11 mt-2" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
