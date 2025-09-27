import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { Option } from "../types/options";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options = [],
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value = [], onChange, ...rest },
        formState: { errors },
      }) => (
        <>
          <ToggleButtonGroup
            onChange={(_, newValue) => {
              onChange(Array.isArray(newValue) ? newValue : []);
            }}
            value={Array.isArray(value) ? value : []}
            {...rest}
          >
            {options.map((option) => (
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {errors[name] && (
            <label
              style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}
            >
              {String(errors[name]?.message)}
            </label>
          )}
        </>
      )}
    />
  );
}
