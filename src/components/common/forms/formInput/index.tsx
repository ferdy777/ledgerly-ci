import { useField } from "formik";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/common/typography";

export type FormInputProps = {
  name: string;
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

const FormInput = ({ name, label, className, ...props }: FormInputProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name}>
          <Typography
            as="span"
            variant="body-small"
            className="font-medium text-gray-700"
          >
            {label}
          </Typography>
        </label>
      )}
      <input
        id={name}
        data-cy={name}
        {...field}
        {...props}
        className={cn(
          "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-900 outline-none",
          "focus:border-gray-400 focus:ring-2 focus:ring-gray-100",
          hasError && "border-red-400",
          className,
        )}
      />
      {hasError && (
        <Typography
          variant="body-x-small"
          className="text-red-500"
          data-cy={`${name}-error`}
        >
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default FormInput;
