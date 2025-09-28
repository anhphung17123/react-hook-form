import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...rest} }) => (
       <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={label}
          value={value || null}
          {...rest}
        />
       </LocalizationProvider>
      )}
    />
  );
}
