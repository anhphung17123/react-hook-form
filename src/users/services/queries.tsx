import { useQuery } from "@tanstack/react-query";
import { type Option } from "../../types/options";
import { apiInstance } from "../../config/axios";

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
