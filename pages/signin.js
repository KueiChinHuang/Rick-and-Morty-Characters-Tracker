import SignInLayout from '../components/signInLayout';
import Form from '../components/form';

const SignIn = () => {
  return (
    <>
    <Head>
      <title>{props.title ? `${props.title} | Cool App` : 'Cool App'}</title>
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
