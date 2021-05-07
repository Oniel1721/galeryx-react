import { makeStyles } from "@material-ui/styles";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { IconButton } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  pictureArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#00000099",
    maxWidth: "100%",
    minWidth: "100%",
    margin: "auto",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    padding: 0,
    margin: 0,
  },
  panel: {
    display: "flex",
    minWidth: "100%",
    maxWidth: "100%",
    alignItems: "center",
  },
  iconButton: {},
  filler: {
    flexGrow: 1,
    color: "white",
    fontSize: "1rem",
    display: "flex",
    overflow: "hidden",
    whiteSpace: "pre",
  },
  pictureName: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  column: {
    minHeight: "100%",
    minWidth: "12.5%",
    maxWidth: "12.5%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },

  center: {
    display: "flex",
    maxWidth: "75%",
    maxHeight: "100%",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
});

const FullScreen = (props: any) => {
  const classes = useStyles();
  const index = props.index;
  const picture = props.pictures[index];
  const getName = (name: string) => {
    return name.toUpperCase();
  };

  let encType = `data:${picture.type};base64,  `;
  if (!picture.type) encType = "";
  return (
    <div className={classes.root}>
      <div
        id="full-width-container"
        onClick={props.onClick}
        className={classes.content}
      >
        <div className={classes.pictureArea}>
          <div className={classes.column}>
            <IconButton onClick={props.onBefore} style={{ color: "white" }}>
              <NavigateBeforeIcon />
            </IconButton>
          </div>
          <div className={classes.center}>
            <div className={classes.panel}>
              <div className={classes.filler}>
                <p
                  onClick={props.handleChangeName}
                  className={classes.pictureName}
                >
                  {getName(picture.name)}
                </p>
              </div>
              <IconButton
                onClick={props.handleDeletePicture}
                className={classes.iconButton}
                id={picture._id}
              >
                <DeleteOutlineOutlinedIcon color="error" />
              </IconButton>
            </div>
            <img
              className={classes.img}
              src={`${encType}${picture.source}`}
              alt={picture.name}
            />
          </div>
          <div className={classes.column}>
            <IconButton onClick={props.onNext} style={{ color: "white" }}>
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreen;
