import { useContext } from "react";
import UserContext from "./userContext";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const { user, uid, signOut } = useContext(UserContext);

  return (
    <div className={styles.navbar}>
      {user ? (
        <>
          <span>
            Hello, <strong>{user}</strong>! Your uid is: {uid}
          </span>

          <button className={styles.btn} onClick={signOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <span>Welcome, new friend!</span>

          <Link href="/signin">
            <a className={styles.btn}>Sign In</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
