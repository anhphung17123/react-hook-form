import { useFormContext } from "react-hook-form";
import { type Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { Stack, TextField } from "@mui/material";
import {
  useGetGenders,
  useGetLanguages,
  useGetStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";

export function Users() {
  const { data: states, isLoading: statesLoading } = useGetStates();
  const { data: languages, isLoading: languagesLoading } = useGetLanguages();
  const { data: genders, isLoading: gendersLoading } = useGetGenders();
  const isLoading = statesLoading || languagesLoading || gendersLoading;

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema> label="States" name="states" options={states} />
      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languages}
      />
      <RHFRadioGroup<Schema> label="Gender" name="gender" options={genders} />
    </Stack>
  );
}
