import Axios from "axios";

export const getAllData = async () => {
  let chars = [];
  let nextHref = `https://rickandmortyapi.com/api/character`;

  while (nextHref !== null) {
    const charsResp = await Axios(nextHref);

    if (charsResp !== null) {
      // console.log("charsData in getAllData: ",charsResp)
      const charsData = await charsResp.data;
      nextHref = charsData.info?.next || null;
      chars = [...chars, ...charsData.results];
    }
  }

  return chars;
};

export const getPartData = async (query) => {
  console.log("query in getPartData:", query);
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
