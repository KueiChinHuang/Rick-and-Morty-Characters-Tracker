import Axios from "axios";

export const getAllData = async () => {
  let chars = [];
  let nextHref = `https://rickandmortyapi.com/api/character`;

  while (nextHref !== null) {
    const charsResp = await Axios(nextHref);

    if (charsResp !== null) {
      const charsData = await charsResp.data;
      nextHref = charsData.info?.next || null;
      chars = [...chars, ...charsData.results];
    }
  }

  return chars;
};

export const getPartData = async (query) => {
  let chars = [];
  let nextHref = `https://rickandmortyapi.com/api/character`;

  while (nextHref !== null) {
    const charsResp = await Axios(nextHref, { params: query });
    const charsData = await charsResp.data;
    nextHref = charsData.info?.next || null;
    chars = [...chars, ...charsData.results];
  }

  return chars;
};

export const getOptions = async () => {
  let allOptions = [];
  try {
    let nextHref = "https://rickandmortyapi.com/api/character";

    while (nextHref) {
      const charResp = await Axios.get(nextHref);
      const charData = await charResp.data;
      const options = charData.results.map((e) => {
        const obj = { value: e.id, label: e.name, image: e.image };
        return obj;
      });
      allOptions = [...allOptions, ...options];
      nextHref = charData.info.next;
    }

    return allOptions;
  } catch (error) {
    console.log("can't get options", error);
    return allOptions;
  }
};
