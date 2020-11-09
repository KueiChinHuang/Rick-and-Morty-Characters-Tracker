import Form from "../components/SigninForm.js";
import styles from "../styles/signin.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <h1>Register & Sign In</h1>
      <Form />
    </div>
  );
};

export default SignIn;
