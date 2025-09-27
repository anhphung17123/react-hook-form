import { useFormContext } from "react-hook-form";
import { type Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { Stack, TextField } from "@mui/material";
import { useGetLanguages, useGetStates } from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";

export function Users() {
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStates();
  const {
    data: languages,
    error: languagesError,
    isLoading: languagesLoading,
  } = useGetLanguages();

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  if (statesLoading || languagesLoading) {
    return <div>Loading...</div>;
  }

  if (statesError || languagesError) {
    return (
      <div>
        Error loading data.
        <br />
        {statesError && (
          <div>States error: {String(statesError.message || statesError)}</div>
        )}
        {languagesError && (
          <div>
            Languages error: {String(languagesError.message || languagesError)}
          </div>
        )}
      </div>
    );
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
    </Stack>
  );
}
