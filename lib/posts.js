
export const getCharacters = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const charResp = await Axios.get("https://rickandmortyapi.com/api/character");
    return charResp;
  }

