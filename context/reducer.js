export const initialState = {
  user: null,
  characters: null,
  options: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      action.payload.user
        ? localStorage.setItem("user", JSON.stringify(action.payload.user))
        : localStorage.removeItem("user");

      return {
        ...state,
        user: action.payload.user,
      };

    case "SET_CHARACTERS":
      return {
        ...state,
        characters: action.payload.characters,
        options: action.payload.characters.map((e) => ({
          value: e.id,
          label: e.name,
          image: e.image,
        })),
      };

    default:
      return state;
  }
};

export default reducer;
