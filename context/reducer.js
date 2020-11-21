export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      if (action.user) {
        localStorage.setItem("user", JSON.stringify(action.user));
      } else {
        localStorage.removeItem("user");
      }

      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
