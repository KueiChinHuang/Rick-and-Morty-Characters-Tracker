import Link from "next/link";
import { useState } from "react";
import styles from "../styles/filter.module.css";
import Router, { useRouter } from "next/router";

import { cache } from "swr";

const Filter = () => {
  const router = useRouter();
  const [query, setQuery] = useState({}); // Set up state for user's filter input

  const handleChange = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFilter = () => {
    router.push({
      pathname: "/",
      query: query,
    });
  };

  const handleReset = () => {
    setQuery({});
    cache
      .keys()
      .filter((key) =>
        key.startsWith(
          cache
            .serializeKey(["https://rickandmortyapi.com/api/character/"])
            .forEach((key) => cache.delete(key))
        )
      );
    Router.push("/");
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
      <input
        type="submit"
        value="Filter"
        className={styles.btn}
        onClick={handleFilter}
      />
      <input type="reset" className={styles.btn} onClick={handleReset} />
    </form>
  );
};

export default Filter;
