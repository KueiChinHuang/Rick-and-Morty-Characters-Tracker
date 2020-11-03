import Axios from "axios";

export default async function handler(req, res) {
  try {
    let allOptions = [];
    let nextUrl = "https://rickandmortyapi.com/api/character";

    while (nextUrl) {
      const charResp = await Axios.get(nextUrl);
      const charData = await charResp.data;
      const options = charData.results.map((e) => {
        const obj = { value: e.id, label: e.name, image: e.image };
        return obj;
      });
      allOptions = [...allOptions, ...options];
      nextUrl = charData.info.next;
    }

    res.status(200).json({ success: true, data: allOptions });
  } catch (error) {
    res.status(400).json({ success: false, message: "Can't find the user." });
  }
}
