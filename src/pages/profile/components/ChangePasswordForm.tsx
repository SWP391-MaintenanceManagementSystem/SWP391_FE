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
import { NavLink } from "react-router-dom";
import type { ChangePasswordFormData } from "./profile/libs/schema";



type ChangePasswordFormProps = {
  form: ReturnType<typeof useForm<ChangePasswordFormData>>;
  onSubmit: (data: ChangePasswordFormData) => void;
};

export default function ChangePasswordForm({ form, onSubmit }: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 w-full gap-6 md:items-start items-center">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter">Old Password</FormLabel>
                <FormControl>
                  <div className="relative min-w-[200px]">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your old password"
                      {...field}
                      aria-invalid={!!form.formState.errors.oldPassword}
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
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter">
                  ConfirmNew Password
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
          <div className="space-y-4 mt-4 grid grid-cols-2">
            <Button
              type="submit"
              className="w-fit !bg-purple-primary !font-inter !text-white dark:!text-black hover:scale-105 transition-transform duration-150"
            >
              Save Changes
            </Button>
            <NavLink
              to="/forgot-password"
              className=" !underline !text-xs !font-inter text-right "
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>
      </form>
    </Form>
  );
}
