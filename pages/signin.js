import Form from "../components/signinForm.js";
import styles from "../styles/signin.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <Form />
    </div>
  );
};

export default SignIn;
