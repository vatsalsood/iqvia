const citiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY": // Adds city to the list
      return [
        ...state,
        {
          id: action.isValidCity.id,
          name: action.isValidCity.name,
          temperature: action.isValidCity.temperature,
          description: action.isValidCity.description,
          weather: action.isValidCity.weather,
        },
      ];
    case "UPDATE_CITY": // Called when refresh is clicked
      let newState = state.map((s) => {
        if (s.name === action.isValidCity.name) {
          s.temperature = action.isValidCity.temperature;
          s.description = action.isValidCity.description;
        }
        return s;
      });
      return newState;
    case "REMOVE_CITY": // Called when close icon clicked
      return state.filter((s) => s.name !== action.name);
    case "UPDATE_CITY_LIST": // Makes sure the list has only 8 cities
      if (state.length > 8) {
        return state.slice(0, 8);
      } else {
        return state;
      }
    case "CLEAR_CITIES": // Clears all the cities
      return [];
    default:
      return state;
  }
};

export default citiesReducer;
