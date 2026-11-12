import * as Yup from "yup";
import type { Shape } from "@/validations/constants/shape";
import type { ILoginForm } from "../hooks/useLoginForm";

export const getLoginSchema = () =>
  Yup.object<Shape<ILoginForm>>({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
