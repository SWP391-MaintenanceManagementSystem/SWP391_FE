import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  icon: LucideIcon;
  numberTotal?: number;
  numberValue?: number;
  description: string;
  textStyle?: string;
}

export default function StatisticsCard({
  title,
  icon: Icon,
  numberTotal,
  numberValue,
  description,
  textStyle,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="h-auto flex flex-col gap-2.5 cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          {numberValue !== undefined && (
            <div className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              $
              {numberValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          )}

          {numberTotal !== undefined && (
            <div className={cn(`text-xl font-bold`, textStyle)}>
              {numberTotal}
            </div>
          )}

          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="font-inter">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              {numberValue !== undefined && (
                <p>
                  Value:{" "}
                  <strong className="text-2xl font-bold">
                    $
                    {numberValue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </p>
              )}
              {numberTotal !== undefined && (
                <p>
                  Total:
                  <strong className="text-2xl font-bold">{numberTotal}</strong>
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
