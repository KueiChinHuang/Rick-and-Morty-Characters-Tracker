import Link from "next/link";
import { useState } from "react";

const Filter = () => {
    const queryObj = {}
    const [query, setQuery] = useState('')

    const handleChange = (e) => {
        queryObj[e.target.name] = e.target.value

        // for (const [key, value] of Object.entries(queryObj)) {
        //   setQuery(prev => {
        //     if (value) {
        //       `${prev}&${key}=${value}`
        //     }
        //   })
        // }
    }

    // const handleSubmit = () => {
    //     for (const [key, value] of Object.entries(queryObj)) {
    //         setQuery(prev => {
    //           if (value) {
    //             `${prev}&${key}=${value}`
    //           }
    //         })
    //     }

    //     redirects(query)
    // }

    return (
      <form >
      <label >
        {/* <label onSubmit={handleSubmit}> */}
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
        {/* <input type="submit" value="Filter" /> */}
        <Link
          href={{
            pathname: '/filter',
            query: { name: 'rick' },
          }}
        >
          <a> Filter </a>
        </Link>
      </form>
    )
}

export default Filter