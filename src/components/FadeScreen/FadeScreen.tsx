import React from "react";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    position: "fixed",
    backgroundColor: `#00000099`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "all 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    backgroundColor: "transparent",
    visibility: "hidden",
    zIndex: -1,
  },
});

const FadeScreen = (props:any) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${props.active ? "":classes.hidden}`}>
      {props.children}
    </div>
  );
};

export default FadeScreen;
