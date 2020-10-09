let cities = [];

const citiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY":
      cities.push(action.city);
      return cities;
  }
};

export default citiesReducer;
