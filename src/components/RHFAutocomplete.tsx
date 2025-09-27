import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import type { Option } from "../types/options";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options = [],
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value.map((id: string) =>
            options.find((item) => item.id === id)
          )}
          getOptionLabel={(option: Option) =>
            options.find((item) => item.id === option.id)?.label || ""
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props} key={option.id}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
}
