import { type Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { Stack } from "@mui/material";
import {
  useGetGenders,
  useGetLanguages,
  useGetSkills,
  useGetStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";

export function Users() {
  const { data: states, isLoading: statesLoading } = useGetStates();
  const { data: languages, isLoading: languagesLoading } = useGetLanguages();
  const { data: genders, isLoading: gendersLoading } = useGetGenders();
  const { data: skills, isLoading: skillsLoading } = useGetSkills();

  const isLoading =
    statesLoading || languagesLoading || gendersLoading || skillsLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack sx={{ gap: 2 }}>
      <RHFTextField<Schema> name="name" label="Name" />
      <RHFTextField<Schema> name="email" label="Email" />
      <RHFAutocomplete<Schema> label="States" name="states" options={states} />
      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languages}
      />
      <RHFRadioGroup<Schema> label="Gender" name="gender" options={genders} />
      <RHFCheckbox<Schema> label="Skills" name="skills" options={skills} />
      <RHFDateTimePicker<Schema>
        name="registration"
        label="Registration Date & Time"
      />
      <RHFDateRangePicker<Schema>
        name="formerPeriod"
        label="Former Employee Period"
      />
      <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
      <RHFSwitch<Schema> name="isTeacher" label="Are you a Teacher" />
    </Stack>
  );
}
