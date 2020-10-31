import axios from "axios";

export default async function charHandler(req, res) {
  const id = req.query.id;

  const url = `https://rickandmortyapi.com/api/character/${id}`;
  let resData = {};
  await axios
    .get(url)
    .then((response) => {
      resData = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });

  res.status(200).json(resData);
}
