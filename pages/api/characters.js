import axios from "axios";

export default async function handler(req, res) {
  const name = req.query.name ? req.query.name : "";
  const status = req.query.status ? req.query.status : "";
  const type = req.query.type ? req.query.type : "";
  const gender = req.query.gender ? req.query.gender : "";

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

    console.log("charsData in getAllData: ", charsData);

    if (charsData !== null) {
      //   const charsData = await charsResp.json()
      nextHref = charsData.info?.next || null;
      chars = [...chars, ...charsData.results];
    }
  }

  res.status(200).json(chars);
}
