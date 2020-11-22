import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useStateValue } from "../context/StateProvider";
import { useRouter } from "next/router";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  const signOut = () => {
    dispatch({
      type: "LOG_OUT",
    });
    router.push(`/`);
  };

  return (
    <div className={styles.navbar}>
      {user ? (
        <>
          <span>
            Hello, <strong>{user.username}</strong>!
          </span>

          <span>UID: {user.uid}</span>

          <div className={styles.btn} onClick={signOut}>
            Sign Out
          </div>
        </>
      ) : (
        <>
          <span>Welcome, new friend!</span>

          <Link href="/signin">
            <a className={styles.btn}>Register & Sign In</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
