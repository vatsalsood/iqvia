let cities = [];

const citiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY":
      console.log("state", state);
      return [...state, { name: action.city }];
    default:
      return state;
  }
};

export default citiesReducer;
