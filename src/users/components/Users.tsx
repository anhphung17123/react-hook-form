import { defaultValues, type Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import {
  useGetGenders,
  useGetLanguages,
  useGetSkills,
  useGetStates,
  useGetUserById,
  useGetUsers,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Fragment, useEffect } from "react";

export function Users() {
  const { data: states, isLoading: statesLoading } = useGetStates();
  const { data: languages, isLoading: languagesLoading } = useGetLanguages();
  const { data: genders, isLoading: gendersLoading } = useGetGenders();
  const { data: skills, isLoading: skillsLoading } = useGetSkills();
  const { data: users } = useGetUsers();

  const isLoading =
    statesLoading || languagesLoading || gendersLoading || skillsLoading;

  const { unregister, control, reset, setValue } = useFormContext<Schema>();
  const { append, remove, replace, fields } = useFieldArray<Schema>({
    name: "students",
  });
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const id = useWatch({ control, name: "id" });
  const { data: user } = useGetUserById(id);

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, []);
  useEffect(() => {
    if (user) {
      reset(user as Schema);
    }
  }, [user, reset]);

  const handleClickUser = (id: string) => {
    setValue("id", id);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" component="form">
      <Stack flexDirection="row" gap={4} paddingY={4}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {users?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleClickUser(user.id)}
                selected={user.id === id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
          <RHFAutocomplete<Schema>
            label="States"
            name="states"
            options={states}
          />
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languages}
          />
          <RHFRadioGroup<Schema>
            label="Gender"
            name="gender"
            options={genders}
          />
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

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<Schema>
                key={field.id}
                name={`students.${index}.name`}
                label={`Student ${index + 1} Name`}
              />
              <Button onClick={() => remove(index)} type="button">
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button type="submit">Submit</Button>
            <Button type="reset" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
