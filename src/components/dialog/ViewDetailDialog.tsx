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

interface ViewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
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
        <Input className="w-full" id={id} disabled value={value} />
      ) : (
        <div className="rounded-lg w-full border px-3 py-2 text-sm bg-muted">
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
  title: string;
  styleFormLayout?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[16px] font-medium">{title}</h2>
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
}: ViewDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px] md:max-w-[760px] font-inter  ">
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
