import { useState } from "react";
import styles from "../styles/filter.module.css";
import Router, { useRouter } from "next/router";
import Select from "react-select";
import { useStateValue } from "../context/StateProvider";

const Filter = () => {
  const router = useRouter();
  const [query, setQuery] = useState({}); // Set up state for user's filter input
  const [nameSelected, setNameSelected] = useState({});
  const [statusSelected, setStatusSelected] = useState({});
  const [speciesSelected, setSpeciesSelected] = useState({});
  const [typeSelected, setTypeSelected] = useState({});
  const [genderSelected, setGenderSelected] = useState({});

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
        setNameSelected(e);
        break;
      case "status":
        setStatusSelected(e);
        break;
      case "species":
        setSpeciesSelected(e);
        break;
      case "type":
        setTypeSelected(e);
        break;
      case "gender":
        setGenderSelected(e);
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
    setNameSelected({});
    setStatusSelected({});
    setSpeciesSelected({});
    setTypeSelected({});
    setGenderSelected({});

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
          value={nameSelected}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Status:</span>
        <Select
          options={options_status}
          value={statusSelected}
          onChange={(e) => handleChange(e, "status")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Species:</span>
        <Select
          options={options_species}
          value={speciesSelected}
          onChange={(e) => handleChange(e, "species")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Type:</span>
        <Select
          options={options_type}
          value={typeSelected}
          onChange={(e) => handleChange(e, "type")}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.title}>Gender:</span>
        <Select
          options={options_gender}
          value={genderSelected}
          onChange={(e) => handleChange(e, "gender")}
        />
      </label>
      <div className={styles.buttons}>
        <input
          type="submit"
          value="Filter"
          className={styles.btn}
          onClick={handleFilter}
        />
        <input type="reset" className={styles.btn} onClick={handleReset} />
      </div>
    </form>
  );
};

export default Filter;
