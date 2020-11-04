import axios from "axios";

export default async function handler(req, res) {
  const {
    query: { name, status, type, gender }
  } = req;

  let chars = [];
  let nextHref = `https://rickandmortyapi.com/api/character/?`;

  while (nextHref !== null) {
    let charsData = {};
    await axios
      .get(nextHref, {
        params: {
          name,
          status,
          type,
          gender,
        },
      })
      .then((response) => {
        charsData = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });

    // console.log("charsData in getAllData: ", charsData);

    if (charsData !== null) {
      nextHref = charsData.info?.next || null;
      chars = [...chars, ...charsData.results];
    }
  }

  res.status(200).json(chars);
}
