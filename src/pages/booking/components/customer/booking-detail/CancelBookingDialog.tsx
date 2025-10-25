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

interface CancelBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelBookingDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelBookingDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
    onConfirm();
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-inter">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to cancel this booking?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once canceled, this booking cannot be recovered. You may need to
            create a new one if you change your mind.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-purple-600 hover:bg-purple-700 text-white">
            No, Keep It
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleCancel}
            className="border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
          >
            Yes, Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
