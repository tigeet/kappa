import { TView } from "@/types";
import clsx from "clsx";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { memo, useCallback } from "react";
import ListIcon from "@/svg/align-left.svg";
import GridIcon from "@/svg/grid.svg";

type Props<T extends string> = {
  className?: string;
  value: T;
  onChange: (value: T) => void;
};
const DataControls = <T extends string>({
  className,
  value,
  onChange,
}: Props<T>) => {
  const handleChange = useCallback(
    (value: T) => value && onChange(value),
    [onChange]
  );
  return (
    <div className={clsx(className)}>
      <ToggleGroup
        type="single"
        className="inline-flex"
        onValueChange={handleChange}
        value={value}
      >
        <ToggleGroupItem value="list" aria-label="list view">
          <ListIcon
            className={clsx(
              "w-4 h-4 ",
              value === "list" ? "text-blue-500" : "text-gray"
            )}
          />
        </ToggleGroupItem>

        <ToggleGroupItem value="grid" aria-label="grid view">
          <GridIcon
            className={clsx(
              "w-4 h-4 ",
              value === "grid" ? "text-blue-500" : "text-gray"
            )}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
export default DataControls;
