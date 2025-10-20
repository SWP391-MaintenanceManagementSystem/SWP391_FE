import {
  InfoSection,
  InputDisableWithLabel,
} from "@/components/dialog/ViewDetailDialog";
import StockStatusTag from "@/components/tag/StockTag";
import { type Part } from "@/types/models/part";
import dayjs from "dayjs";

interface ViewDetailPartProps {
  partItem: Part;
}

export default function ViewDetailPart({ partItem }: ViewDetailPartProps) {
  return (
    <div className="overflow-y-auto  max-h-[410px]">
      <InfoSection styleFormLayout="md:grid-rows-5 md:grid-cols-2">
        <InputDisableWithLabel label="Name" id="name" value={partItem.name} />
        <InputDisableWithLabel
          label="Category"
          id="category"
          value={partItem.category.name}
        />
        <InputDisableWithLabel
          label="Price"
          id="price"
          value={`$ ${partItem.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        />
        <InputDisableWithLabel
          label="Quantity"
          id="quantity"
          value={partItem.quantity}
        />
        <InputDisableWithLabel
          label="Min stock"
          id="min"
          value={partItem.minStock}
        />
        <InputDisableWithLabel
          label="Status"
          id="status"
          value={<StockStatusTag status={partItem.status} />}
        />
        <InputDisableWithLabel
          label="Created on"
          id="createdAt"
          value={dayjs(partItem.createdAt).format("HH:mm - DD/MM/YYYY")}
        />
        <InputDisableWithLabel
          label="Last updated"
          id="updatedAt"
          value={dayjs(partItem.updatedAt).format("HH:mm - DD/MM/YYYY")}
        />
        <InputDisableWithLabel
          label="Description"
          id="description"
          value={partItem.description}
          styleFormat="md:col-span-2"
        />
      </InfoSection>
    </div>
  );
}
