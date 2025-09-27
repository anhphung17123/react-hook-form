import { FormProvider, useForm } from "react-hook-form";
import { Users } from "./Users";
import { defaultValues, schema, type Schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function UserProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}
