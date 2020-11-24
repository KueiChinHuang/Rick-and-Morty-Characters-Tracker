import Link from "next/link";
import { useState } from "react";
import styles from "../styles/filter.module.css";
import Router, { useRouter } from "next/router";
import Select from "react-select";

import { cache } from "swr";
import { useStateValue } from "../context/StateProvider";

const Filter = () => {
  const router = useRouter();
  const [query, setQuery] = useState({}); // Set up state for user's filter input

  const [
    {
      options_name,
      options_status,
      options_species,
      options_type,
      options_gender,
    },
    dispatch,
  ] = useStateValue();

  const handleChange = (e, targetName) => {
    setQuery((prev) => {
      return {
        ...prev,
        [targetName]: e.label,
      };
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();

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
      {console.log("query", query)}
      <label className={styles.label}>
        <span className={styles.title}>Name:</span>
        <Select
          options={options_name}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Status:</span>
        <Select
          options={options_status}
          onChange={(e) => handleChange(e, "status")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Species:</span>
        <Select
          options={options_species}
          onChange={(e) => handleChange(e, "species")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Type:</span>
        <Select
          options={options_type}
          onChange={(e) => handleChange(e, "type")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Gender:</span>
        <Select
          options={options_gender}
          onChange={(e) => handleChange(e, "gender")}
        />
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
