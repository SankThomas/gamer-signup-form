import { create } from "zustand";
import type { SignupField, SignupValues } from "../lib/signupSchema";

export type SignupStatus = "idle" | "error" | "loading" | "success";

type SignupStore = {
  values: SignupValues;
  touched: Partial<Record<SignupField, boolean>>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  status: SignupStatus;
  setField: (field: SignupField, value: string | boolean) => void;
  touchField: (field: SignupField) => void;
  setStatus: (status: SignupStatus) => void;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  reset: () => void;
};

const initialValues: SignupValues = {
  callsign: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

const initialState = {
  values: initialValues,
  touched: {},
  showPassword: false,
  showConfirmPassword: false,
  status: "idle" as SignupStatus,
};

export const useSignupStore = create<SignupStore>((set) => ({
  ...initialState,
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value } as SignupValues,
      status: state.status === "error" ? "idle" : state.status,
    })),
  touchField: (field) =>
    set((state) => ({ touched: { ...state.touched, [field]: true } })),
  setStatus: (status) => set({ status }),
  togglePasswordVisibility: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPasswordVisibility: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  reset: () => set(initialState),
}));
