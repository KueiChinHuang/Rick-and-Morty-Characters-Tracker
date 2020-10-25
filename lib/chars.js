
import path from 'path'

export const getAllData = async () => {
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