import { useState } from "react";
import styles from "../styles/filter.module.css";
import Router, { useRouter } from "next/router";
import Select from "react-select";
import { useStateValue } from "../context/StateProvider";

const Filter = () => {
  const router = useRouter();
  const [query, setQuery] = useState({}); // Set up state for user's filter input
  const [nameO, setNameO] = useState({});
  const [statusO, setStatusO] = useState({});
  const [speciesO, setSpeciesO] = useState({});
  const [typeO, setTypeO] = useState({});
  const [genderO, setGenderO] = useState({});

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
    switch (targetName) {
      case "name":
        setNameO(e);
        break;
      case "status":
        setStatusO(e);
        break;
      case "species":
        setSpeciesO(e);
        break;
      case "type":
        setTypeO(e);
        break;
      case "gender":
        setGenderO(e);
        break;
    }

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

  const handleReset = (e) => {
    e.preventDefault();
    setNameO({});
    setStatusO({});
    setSpeciesO({});
    setTypeO({});
    setGenderO({});

    setQuery({});
    Router.push("/");
  };

  return (
    <form className={styles.filterForm}>
      <label className={styles.label}>
        <span className={styles.title}>Name:</span>
        {console.log(query, query.name)}
        <Select
          options={options_name}
          value={nameO}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Status:</span>
        <Select
          options={options_status}
          value={statusO}
          onChange={(e) => handleChange(e, "status")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Species:</span>
        <Select
          options={options_species}
          value={speciesO}
          onChange={(e) => handleChange(e, "species")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Type:</span>
        <Select
          options={options_type}
          value={typeO}
          onChange={(e) => handleChange(e, "type")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Gender:</span>
        <Select
          options={options_gender}
          value={genderO}
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
