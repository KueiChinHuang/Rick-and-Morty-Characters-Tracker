export const getAllData = async (query) => {
    // console.log("query in getAllData:", query)
    let chars = []
    let nextHref = `https://rickandmortyapi.com/api/character`

    if (query.includes("/filter")){
      query = query.slice(7, (query.length))
      // console.log("query after been cut in getAllData:", query)
      nextHref = `https://rickandmortyapi.com/api/character/${query}`
    }

    while(nextHref !== null) {
      const charsResp = await fetch(nextHref)
  
      if (charsResp !== null) {
        // console.log("charsData in getAllData: ",charsResp)
        const charsData = await charsResp.json()
        nextHref = charsData.info?.next || null
        chars = [...chars, ...charsData.results]
      }
    }
  
    return chars
}