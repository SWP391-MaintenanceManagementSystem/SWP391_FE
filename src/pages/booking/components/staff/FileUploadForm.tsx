import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import type { BookingCheckinsFormValues } from "@/pages/booking/lib/schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TooltipWrapper } from "@/components/TooltipWrapper";

interface FileUploadFormProps {
  form: ReturnType<typeof useForm<BookingCheckinsFormValues>>;
  onUploadSuccess?: (files: (File | string)[]) => void;
}

export function FileUploadForm({ form, onUploadSuccess }: FileUploadFormProps) {
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field: { value = [], onChange } }) => {
        const handleFileSelect = (files: File[]) => {
          // Avoid duplicates
          const newFiles = files.filter(
            (file) =>
              !value.some(
                (f) =>
                  f instanceof File &&
                  f.name === file.name &&
                  f.size === file.size,
              ),
          );

          // new files & old files
          let updatedFiles = [...value, ...newFiles];

          // Allow up to 6 files
          if (updatedFiles.length > 6) {
            updatedFiles = updatedFiles.slice(0, 6);
            toast.warning("You can only attach up to 6 images.");
          }

          onChange(updatedFiles);
          onUploadSuccess?.(updatedFiles);
        };

        const handleRemoveFile = (index: number) => {
          const updated = value.filter((_, i) => i !== index);
          onChange(updated);
          onUploadSuccess?.(updated);
        };

        return (
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <FormControl>
              <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FileUpload
                  key={value.length}
                  onValueChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  maxFiles={6}
                  maxSize={5 * 1024 * 1024}
                >
                  <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center h-full">
                    <CloudUpload className="size-4" />
                    <span className="ml-2">
                      Drag & drop or{" "}
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                          choose files
                        </Button>
                      </FileUploadTrigger>{" "}
                      to attach
                    </span>
                  </FileUploadDropzone>
                </FileUpload>

                {value.length > 0 && (
                  <div className="flex gap-6 flex-wrap">
                    {value.map((item, index) => {
                      const src =
                        typeof item === "string"
                          ? item
                          : URL.createObjectURL(item);

                      return (
                        <div
                          key={index}
                          className="relative w-24 h-24 border rounded overflow-hidden"
                        >
                          <TooltipWrapper content="View Image">
                            <a
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={src}
                                alt={`preview-${index}`}
                                className="object-cover w-full h-full"
                              />
                            </a>
                          </TooltipWrapper>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                          >
                            <X className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Attach up to 6 images (max 5MB each).
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
