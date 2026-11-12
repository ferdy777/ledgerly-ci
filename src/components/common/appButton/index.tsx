import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Submit buttons use `isLoading` (not `disabled`) to show the pending state.
const AppButton = ({
  isLoading = false,
  className,
  children,
  type = "button",
  ...props
}: Props) => (
  <button
    type={type}
    aria-busy={isLoading}
    {...props}
    disabled={isLoading || props.disabled}
    className={cn(
      "w-full rounded-lg bg-blue-600 px-4 py-3 text-[14px] font-medium text-white transition-colors",
      "hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
  >
    {isLoading ? "Please wait…" : children}
  </button>
);

export default AppButton;
