import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useStateValue } from "../context/StateProvider";
import { useRouter } from "next/router";

const Navbar = () => {
  const [{ username }, dispatch] = useStateValue();
  const router = useRouter();

  const signOut = () => {
    dispatch({
      type: "LOG_OUT",
    });
    router.push(`/`);
  };

  return (
    <div className={styles.navbar}>
      {username ? (
        <>
          <span>
            Hello, <strong>{username}</strong>!
          </span>

          <div className={styles.btn} onClick={signOut}>
            Sign Out
          </div>
        </>
      ) : (
        <>
          <span>Welcome! Sign in to save your favorite characters 👉</span>

          <Link href="/signin">
            <a className={styles.btn}>Sign In</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
