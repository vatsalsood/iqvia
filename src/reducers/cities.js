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
    default:
      return state;
  }
};

export default citiesReducer;
