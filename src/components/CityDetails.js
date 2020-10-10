import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { mdiCloud } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CityDetails = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Icon path={mdiCloud} title="Clouds" size={3} />
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default CityDetails;
