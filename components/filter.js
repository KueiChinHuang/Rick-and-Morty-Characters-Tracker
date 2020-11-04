import Link from "next/link";
import { useState } from "react";
import styles from "../styles/filter.module.css";
import Router from "next/router";

const Filter = () => {
  const [query, setQuery] = useState({});

  const handleChange = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <form className={styles.filterForm}>
      <label className={styles.label}>
        <span className={styles.title}>Name:</span>
        <input name="name" type="text" onChange={handleChange} />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Status:</span>
        <input name="status" type="text" onChange={handleChange} />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Species:</span>
        <input name="species" type="text" onChange={handleChange} />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Type:</span>
        <input name="type" type="text" onChange={handleChange} />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Gender:</span>
        <input name="gender" type="text" onChange={handleChange} />
      </label>
      <Link
        href={{
          pathname: "/",
          query: query,
        }}
      >
        <a className={styles.btn}> Filter </a>
      </Link>
      <input
        type="reset"
        defaultValue="Reset"
        className={styles.btn}
        onClick={() => {
          Router.push("/");
          setQuery({});
        }}
      />
      <Link href="/favorite">
        <a className={styles.orangeBtn}>My Favorite</a>
      </Link>
    </form>
  );
};

export default Filter;
