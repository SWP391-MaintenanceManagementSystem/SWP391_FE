import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDisabled?: boolean;
  isPending?: boolean;
}
export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  isDisabled,
  isPending,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-inter">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will mark the item as deleted. You can no longer use it
            once updated.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="!outline-none"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              className="!outline-none text-white !bg-red-600 hover:scale-105 transition-transform duration-300"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              disabled={isDisabled || isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
