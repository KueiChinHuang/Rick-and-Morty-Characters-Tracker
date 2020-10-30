import Form from "../components/SigninForm";
import styles from "../components/Signin.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <Form />
    </div>
  );
};

export default SignIn;
