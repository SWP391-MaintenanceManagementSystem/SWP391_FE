import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { changePassword } from "@/services/auth/apis/auth.api";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    newPassword: z
      .string()
      .min(8, "Password must be between 8 and 50 characters long")
      .max(50, "Password must be between 8 and 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    confirmNewPassword: z
      .string()
      .nonempty("New Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Password do not match",
    path: ["confirmNewPassword"],
  });

export default function PasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    console.log(formData);
    try {
      const response = await changePassword(formData);
      if (response) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Failed to change password");
      }
      form.reset();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 w-full gap-6 md:items-start items-center">
          {/*Password*/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter">Password</FormLabel>
                <FormControl>
                  <div className="relative min-w-[200px]">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      aria-invalid={!!form.formState.errors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 !bg-transparent text-gray-400 cursor-pointer"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter">New Password</FormLabel>
                <FormControl>
                  <div className="relative min-w-[200px]">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...field}
                      aria-invalid={!!form.formState.errors.newPassword}
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 !bg-transparent text-gray-400 cursor-pointer"
                    >
                      {showNewPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm New Password */}
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative min-w-[200px]">
                    <Input
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...field}
                      aria-invalid={!!form.formState.errors.confirmNewPassword}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 !bg-transparent text-gray-400 cursor-pointer"
                    >
                      {showConfirmNewPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4 mt-6 grid grid-cols-1">
            <Button
              type="submit"
              className=" w-[180px] !bg-purple-primary !font-inter !text-white hover:scale-105 transition-transform duration-150"
            >
              Save Changes
            </Button>
            <NavLink
              to="/forgot-password"
              className=" !underline !text-xs !font-inter ml-2 "
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>
      </form>
    </Form>
  );
}
