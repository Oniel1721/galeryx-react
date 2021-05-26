import React from "react";
import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
  figure: {
    backgroundColor: theme.palette.secondary.main,
    overflow: "hidden",
    borderRadius: "1rem",
    [theme.breakpoints.up(1080)]: {
      width: "20vw",
      height: "12.5vw",
    },
    [theme.breakpoints.down(1080)]: {
      width: "33vw",
      height: "33vw",
    },
    [theme.breakpoints.down(720)]: {
      width: "45vw",
      height: "45vw",
    },
    [theme.breakpoints.down(500)]: {
      minWidth: "70vw",
      height: "70vw",
    },
  },
  img: {
    width: "100%",
    height: "80%",
    objectFit: "cover",
    objectPosition: "center center",
    cursor: "pointer",
  },
  caption: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    paddingBottom: "0.5rem",
  },
});

const Picture = (props: any) => {
  const classes = useStyles();
  let encType = `data:${props.type};base64,  `;
  if (!props.type) encType = "";

  const resumeName = ()=>{
    let name = props.name.toUpperCase()
    return name.length>12?`${name.slice(0,12)}...`:name;
  }

  return (
    <figure id={props.id} className={classes.figure}>
      <img
        onClick={props.onClick}
        className={classes.img}
        src={`${encType}${props.source}`}
        alt={props.name}
      />
      <figcaption className={classes.caption}>
        {resumeName()}
      </figcaption>
    </figure>
  );
};

export default Picture;
