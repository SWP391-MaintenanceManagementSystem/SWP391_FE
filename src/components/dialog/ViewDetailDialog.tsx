import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

interface ViewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  styleContent?: string;
}

type InputDisableWithLabelProps = {
  label: string;
  value: React.ReactNode;
  id: string;
  styleFormat?: string;
};

export function InputDisableWithLabel({
  label,
  value,
  id,
  styleFormat,
}: InputDisableWithLabelProps) {
  return (
    <div className={cn("flex flex-col w-full gap-2", styleFormat)}>
      <Label htmlFor={id}>{label}</Label>
      {typeof value === "string" ? (
        <Input className="w-full" id={id} readOnly value={value} />
      ) : (
        <div className="rounded-md w-full border px-3 py-2 text-sm text-gray-400">
          {value}
        </div>
      )}
    </div>
  );
}

export const InfoSection = ({
  children,
  title,
  styleFormLayout,
}: {
  children: React.ReactNode;
  title?: string;
  styleFormLayout?: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <h2 className="text-[16px] font-medium flex text-center items-center gap-1">
          <InfoIcon size={18} />
          {title}
        </h2>
      )}
      <div className={cn("grid grid-cols-1 gap-4", styleFormLayout)}>
        {children}
      </div>
    </div>
  );
};

export function ViewDetailDialog({
  open,
  onOpenChange,
  children,
  title,
  styleContent,
}: ViewDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent
          className={cn(
            "sm:max-w-[425px] font-inter overflow-y-auto",
            styleContent,
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-3">
            <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">.</DialogDescription>
          {children}
        </DialogContent>
      </form>
    </Dialog>
  );
}
