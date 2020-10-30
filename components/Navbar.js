import { useContext } from "react";
import UserContext from "./UserContext";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const { user, uid, signOut } = useContext(UserContext);

  return (
    <div className={styles.navbar}>
      {user ? (
        <>
          <span>
            Hello, <strong>{user}</strong>!
          </span>

          <span>UID: {uid}</span>

          <div className={styles.btn} onClick={signOut}>
            Sign Out
          </div>
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
