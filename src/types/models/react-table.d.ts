import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    filterVariant?: string;
    filterOptions?: string[];
    labelOptions?: string[] | undefine;
    title?: string;
  }
}
