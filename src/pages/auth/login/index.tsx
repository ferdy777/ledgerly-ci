import Form from "@/components/common/forms/form";
import Typography from "@/components/common/typography";
import EnvBadge from "@/components/common/envBadge";
import { MOCK_USERS } from "@/data/mockUsers";
import LoginFormFields from "./components/loginFormFields";
import useLoginForm, { initialValues } from "./hooks/useLoginForm";
import { getLoginSchema } from "./utils/getLoginSchema";

const Login = () => {
  const { isPending, errorMessage, handleSubmit } = useLoginForm();
  const demo = MOCK_USERS[0];

  return (
    <div className="flex flex-col gap-6">
      <Typography as="h1" variant="heading-4" className="font-semibold">
        Welcome back
      </Typography>
      <Typography variant="body-small" className="text-gray-500" data-cy="demo-hint">
        Demo account: {demo.email} / {demo.password}
      </Typography>
      <Form
        initialValues={initialValues}
        validationSchema={getLoginSchema()}
        onSubmit={handleSubmit}
      >
        {() => (
          <LoginFormFields isLoading={isPending} errorMessage={errorMessage} />
        )}
      </Form>
      <EnvBadge />
    </div>
  );
};

export default Login;
