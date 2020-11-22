export const initialState = {
  user: null,
  characters: null,
  options: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
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
