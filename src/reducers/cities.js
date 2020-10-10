let cities = [];

const citiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY":
      return [
        ...state,
        {
          name: action.isValidCity.name,
          temperature: action.isValidCity.temperature,
          description: action.isValidCity.description,
        },
      ];
    case "UPDATE_CITY":
      let newState = state.map((s) => {
        if (s.name === action.isValidCity.name) {
          s.temperature = action.isValidCity.temperature;
          s.description = action.isValidCity.description;
        }
        return s;
      });
      return newState;
    case "REMOVE_CITY":
      return state.filter((s) => s.name !== action.name);
    case "CLEAR_CITIES":
      return [];
    default:
      return state;
  }
};

export default citiesReducer;
