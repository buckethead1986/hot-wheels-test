import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function NestedGrid(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://i5.walmartimages.com/asr/3256e83b-b166-4e7c-aed7-be8be2132fbb_1.578ea2444babe7bdfeac9d3a152331c5.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography>{props.text[0]}</Typography>
              </Grid>
              <Grid item xs>
                <Typography>{props.text[1]}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
