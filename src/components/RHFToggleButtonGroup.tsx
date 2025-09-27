import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { Option } from "../types/options";
import {
  FormControl,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  exclusive?: boolean; // single select if true
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options = [],
  exclusive = false,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <FormControl error={!!errors[name]}>
          <ToggleButtonGroup
            exclusive={exclusive}
            value={value ?? (exclusive ? null : [])}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
          >
            {options.map((option) => (
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {errors[name] && (
            <FormHelperText error={!!errors[name]}>
              {String(errors[name]?.message)}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
