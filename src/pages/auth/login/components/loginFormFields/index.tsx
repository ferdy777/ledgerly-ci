import FormInput from "@/components/common/forms/formInput";
import AppButton from "@/components/common/appButton";
import Typography from "@/components/common/typography";

type Props = {
  isLoading: boolean;
  errorMessage: string | null;
};

const LoginFormFields = ({ isLoading, errorMessage }: Props) => (
  <div className="flex flex-col gap-5">
    <FormInput
      name="email"
      label="Email"
      type="email"
      placeholder="Enter your Email Address"
    />
    <FormInput
      name="password"
      label="Password"
      type="password"
      placeholder="Enter your Password"
    />
    {errorMessage && (
      <Typography
        variant="body-small"
        className="text-red-500"
        role="alert"
        data-cy="login-error"
      >
        {errorMessage}
      </Typography>
    )}
    <AppButton type="submit" isLoading={isLoading} data-cy="login-submit">
      Log in
    </AppButton>
  </div>
);

export default LoginFormFields;
