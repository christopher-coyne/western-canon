import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Item {
  id: string;
  name?: string;
  label?: string;
  [key: string]: any;
}

interface MultiSelectDropdownProps {
  title: string;
  items: Item[];
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  itemLabel?: (item: Item) => string;
  itemValue?: (item: Item) => string;
}

export const MultiSelectDropdown = ({
  title,
  items,
  selectedItems,
  onItemToggle,
  itemLabel = (item) => item.name || item.label || "",
  itemValue = (item) => item.id,
}: MultiSelectDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-full">
          <span>
            {title} {selectedItems.length > 0 && `(${selectedItems.length})`}
          </span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-60 overflow-auto">
          {items.map((item) => (
            <DropdownMenuItem
              key={itemValue(item)}
              className="flex items-center gap-2 cursor-pointer"
              onSelect={(e) => {
                e.preventDefault(); // Prevent closing on select
                onItemToggle(itemValue(item));
              }}
            >
              <Checkbox
                id={`${title}-${itemValue(item)}`}
                checked={selectedItems.includes(itemValue(item))}
                onCheckedChange={() => onItemToggle(itemValue(item))}
              />
              <label
                htmlFor={`${title}-${itemValue(item)}`}
                className="flex-grow cursor-pointer"
              >
                {itemLabel(item)}
              </label>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelectDropdown;
