import { useState } from "react";
import type { FormikHelpers } from "formik";
import { useLogin } from "@/hooks/auth";
import { useAuthStore } from "@/store/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";

export interface ILoginForm {
  email: string;
  password: string;
}

export const initialValues: ILoginForm = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const { handleLoginSuccess } = useAuthStore();
  const { mutateAsync: login, isPending } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // On success the store updates; AuthLayout then redirects to /members.
  const handleSubmit = async (
    values: ILoginForm,
    { setSubmitting }: FormikHelpers<ILoginForm>,
  ) => {
    setErrorMessage(null);
    try {
      const user = await login(values);
      handleLoginSuccess(user);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return { isPending, errorMessage, handleSubmit };
};

export default useLoginForm;
