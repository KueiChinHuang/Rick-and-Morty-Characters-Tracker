
export const getAllData = async (query) => {
    console.log("query in getAllData:", query)
    let chars = []
    let nextHref = `https://rickandmortyapi.com/api/character`
    if (query.includes("/filter")){
      query = query.slice(7, (query.length-1))
      nextHref = `https://rickandmortyapi.com/api/character/${query}`
    }
    
    while(nextHref !== null) {
      const charsResp = await fetch(nextHref)
  
      if (charsResp !== null) {
        console.log("charsData in getAllData: ",charsResp)
        const charsData = await charsResp.json()
        nextHref = charsData.info?.next || null
        chars = [...chars, ...charsData.results]
      }
    }
  
    return chars
}

/*
export const getAllCharIds = async () => {
    let chars = []
    let nextHref = "https://rickandmortyapi.com/api/character"
  
    while(nextHref !== null) {
      const charsResp = await fetch(nextHref)
      const charsData = await charsResp.json()
  
      if (charsData) {
        nextHref = charsData.info.next
        chars = [...chars, ...charsData.results]
      }
    }
  
    return chars.map(char => {
        return {
            params: {
                id: char.id
            }
        }
    })
}

export const getCharData = async (id) => {
    const charResp = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const charData = await charResp.json()
  
    return {
        id,
        ...charData.data
    }
}

*/