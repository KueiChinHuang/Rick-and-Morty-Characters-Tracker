import Axios from "axios";

export const getFirstPageData = async () => {
  let chars = [];
  let url = `https://rickandmortyapi.com/api/character`;

  const charsResp = await Axios(url);

  if (charsResp !== null) {
    const charsData = await charsResp.data;
    chars = [...chars, ...charsData.results];
  }

  return chars;
};

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

// export const getPartData = async (query) => {
//   let chars = [];
//   let nextHref = `https://rickandmortyapi.com/api/character`;

//   while (nextHref !== null) {
//     const charsResp = await Axios(nextHref, { params: query });
//     const charsData = await charsResp.data;
//     nextHref = charsData.info?.next || null;
//     chars = [...chars, ...charsData.results];
//   }

//   return chars;
// };
