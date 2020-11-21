export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        localStorage.removeItem("user");
      }

      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default reducer;
