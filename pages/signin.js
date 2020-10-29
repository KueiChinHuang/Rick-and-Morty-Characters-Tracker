import SignInLayout from '../components/signInLayout';
import Form from '../components/form';
import Head from 'next/head';

const SignIn = () => {
  return (
    <>
    <Head>
      <title>Sign In</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <SignInLayout title="Sign In">
      <h1>Sign In</h1>
      <Form />
    </SignInLayout>
    </>
  );
};

export default SignIn;
