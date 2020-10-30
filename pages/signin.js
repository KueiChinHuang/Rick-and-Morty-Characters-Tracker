import SignInLayout from "../components/signInLayout";
import Form from "../components/form";
import Head from "next/head";

const SignIn = () => {
  return (
    <>
      <SignInLayout title="Sign In">
        <h1>Sign In</h1>
        <Form />
      </SignInLayout>
    </>
  );
};

export default SignIn;
