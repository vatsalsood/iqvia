import React, { useEffect, useState, useReducer, useContext } from "react";
import CitiesContext from "../context/cities-context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const CityList = () => {
  const { cities } = useContext(CitiesContext);

  return (
    <div>
      <List>
        {cities.map((city) => {
          return (
            <ListItem key={city.name}>
              <ListItemText key={city.name} primary={city.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default CityList;
