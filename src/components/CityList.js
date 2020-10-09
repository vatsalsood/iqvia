import React, { useEffect, useState, useReducer, useContext } from "react";
import CitiesContext from "../context/cities-context";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const CityList = () => {
  const { cities } = useContext(CitiesContext);
  const classes = useStyles();

  return (
    <div>
      <List>
        {cities.reverse().map((city) => {
          return (
            <ListItem key={city.name}>
              <ListItemText
                key={city.name}
                primary={city.name }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {city.temperature}
                    </Typography>
                      -- {city.description}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default CityList;
