import Link from "next/link";
import { useState } from "react";

const Filter = () => {
    const [query, setQuery] = useState({})

    const handleChange = (e) => {
      setQuery(prev => {
        return {
          ...prev, 
          [e.target.name]: e.target.value
      }})
    }

    return (
      <form>
      <label>
          Name:
          <input name="name" type="text" onChange={handleChange} />
        </label>
        <label>
          Status:
          <input name="status" type="text" onChange={handleChange} />
        </label>
        <label>
          Species:
          <input name="species" type="text" onChange={handleChange} />
        </label>
        <label>
          Type:
          <input name="type" type="text" onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input name="gender" type="text" onChange={handleChange} />
        </label>
        <Link
          href={{
            pathname: '/filter',
            query: query,
          }}
        >
          <a> Filter </a>
        </Link>
        <Link href="/"><a>Clear</a></Link>
      </form>
    )
}

export default Filter