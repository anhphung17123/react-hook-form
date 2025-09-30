export type Create = {
  variant: "create";
};

export type Edit = {
  variant: "edit";
  id: string;
};

export type UserFormType = {
  email: string;
  name: string;
  states: string[];
  languagesSpoken: string[];
  gender: string;
  skills: string[];
  registration: Date;
  formerPeriod: Date[];
  salaryRange: number[];
  isTeacher: boolean;
  students?: { name: string }[];
};

export type ApiType = UserFormType & (Create | Edit);
export type ApiGet = Edit & UserFormType;
