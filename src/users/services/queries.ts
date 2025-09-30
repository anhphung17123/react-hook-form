import { useQuery } from "@tanstack/react-query";
import { type Option } from "../../types/options";
import { apiInstance } from "../../config/axios";
import type { ApiGet } from "../types/apiType";

export const useGetStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => apiInstance.get<Option[]>("/states").then((res) => res.data),
  });
};

export const useGetLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      apiInstance.get<Option[]>("/languages").then((res) => res.data),
  });
};

export const useGetGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      apiInstance.get<Option[]>("/genders").then((res) => res.data),
  });
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => apiInstance.get<Option[]>("/skills").then((res) => res.data),
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      apiInstance
        .get<ApiGet[]>("/users")
        .then((res) =>
          res.data.map((user) => ({ id: user.id, label: user.name } as Option))
        ),
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      apiInstance.get<ApiGet>(`/users/${id}`).then((res) => ({
        ...res.data,
        formerPeriod: [
          new Date(res.data.formerPeriod[0]),
          new Date(res.data.formerPeriod[1]),
        ],
        registration: new Date(res.data.registration),
      })),
    enabled: !!id,
  });
};
