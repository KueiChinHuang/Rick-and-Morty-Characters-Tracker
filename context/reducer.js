export const initialState = {
  username: null,
  characters: null,
  options_character: null,
  options_name: null,
  options_status: null,
  options_species: null,
  options_type: null,
  options_gender: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.payload.username,
      };

    case "LOG_OUT":
      localStorage.removeItem("user");
      localStorage.removeItem("characters");
      return initialState;

    case "SET_CHARACTERS":
      localStorage.setItem(
        "characters",
        JSON.stringify(action.payload.characters)
      );

      let statusSet = [];
      let speciesSet = [];
      let typeSet = [];
      let genderSet = [];
      action.payload.characters.forEach((character) => {
        if (!statusSet.includes(character.status))
          statusSet.push(character.status);
        if (!speciesSet.includes(character.species))
          speciesSet.push(character.species);
        if (!typeSet.includes(character.type)) typeSet.push(character.type);
        if (!genderSet.includes(character.gender))
          genderSet.push(character.gender);
      });

      return {
        ...state,
        characters: action.payload.characters,
        options_character: action.payload.characters.map((e) => ({
          value: e.id,
          label: e.name,
          image: e.image,
        })),
        options_name: action.payload.characters.map((e) => ({
          value: e.id,
          label: e.name,
        })),
        options_status: statusSet.map((status, index) => ({
          value: index,
          label: status,
        })),
        options_species: speciesSet.map((species, index) => ({
          value: index,
          label: species,
        })),
        options_type: typeSet.map((type, index) => ({
          value: index,
          label: type,
        })),
        options_gender: genderSet.map((gender, index) => ({
          value: index,
          label: gender,
        })),
      };

    default:
      return state;
  }
};

export default reducer;
