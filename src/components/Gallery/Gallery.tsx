import React, { useState, useEffect } from "react";

import {
  Grid,
  makeStyles,
  Fab,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import Picture from "../Picture";
import FullScreen from "../FullScreen";

import API from "../../api/axios";
import { getItem } from "../../api/localStorage";
import getLoged from "../../api/getLoged";
import ImageIcon from "@material-ui/icons/Image";
// import FadeScreen from "../FadeScreen";

// import { AddIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  grid: {
    marginTop: "2rem",
    width: "100vw",
  },
  root: {
    width: "100vw",
    minHeight: "93vh",
  },
  addBtn: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    padding: "2rem",
  },
  hidden: {
    display: "none",
  },
  dragZone: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff50",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
    transform: "scale(0)",
  },
  inDragZone: {
    border: "5px dashed #222",
    width: "90%",
    height: "90%",
    backgroundColor: "#bbbbbb80",
    display: "flex",
  },
  dragZoneActive: {
    transform: "scale(1)",
  },
  dragZoneTxt: {
    margin: "auto",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  circularContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "#00000099",
  },
});

const Gallery = (props:any) => {
  const classes = useStyles();

  const [pictures, setPictures] = useState<any>([]);

  const [dragActive, setDragActive] = useState(false);
  const [fadeActive, setFadeActive] = useState(false);
  const [loading, setLoading] = useState(getLoged());
  const [index, setIndex] = useState(0);

  const getPictures = () => {
    if(getItem("token")) {
      setLoading(true);
      API.getPictures((data: any) => {
        setLoading(false);
        setPictures(data);
      });
    }
  };

  useEffect(() => {
    getPictures();
  }, []);

  const handleNext = (e: any = null) => {
    if (index < pictures.length - 1) setIndex(index + 1);
    else setIndex(0);
  };

  const handleBefore = (e: any) => {
    if (index > 0) setIndex(index - 1);
    else setIndex(pictures.length - 1);
  };

  const handleOpenFullWidth = (e: any) => {
    let $all = e.target.parentNode.parentNode.childNodes;
    let $parent = e.target.parentNode;
    let indexOfClicked = Array.from($all).indexOf($parent);
    setIndex(indexOfClicked);
    setFadeActive(true);
  };

  const uploadImage = (image: any) => {
    API.uploadPicture(image, (data: any) => {
      getPictures();
    });
  };

  const handleChange = (e: any) => {
    uploadImage(e.target.files[0]);
  };

  const handleUploaderBtn = (e: any) => {
    document.getElementById("image-file")?.click();
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fadeActive && !loading) setDragActive(true);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fadeActive && !loading) {
      if (e.dataTransfer.files.length) {
        let file = e.dataTransfer.files[0];
        uploadImage(file);
      }
    }
    setDragActive(false);
  };

  const handleFadeClose = (e: any) => {
    if (e.target.id === "full-width-container") {
      setFadeActive(false);
    }
  };

  const handleDeletePicture = (e: any) => {
    API.deletePicture(pictures[index]._id, (data: any) => {
      getPictures();
    });
  };

  const handleChangeName = (e: any) => {
    let answer: string | null = prompt(`set a new name`);
    if (Boolean(answer) && answer !== e.target.textContent) {
      let id: string = e.target.parentNode.nextSibling.id;
      API.updatePictureName(id, answer, (data: any) => {
        getPictures();
      });
    }
  };

  const handleKeyUp = (e: any) => {
    if (fadeActive) {
      switch (e.keyCode) {
        // delete or supr
        case 46:
          handleDeletePicture(null);
          break;
        // right arrow
        case 39:
          handleNext(null);
          break;
        // left arrow
        case 37:
          handleBefore(null);
          break;
        // ESC
        case 27:
          setFadeActive(false);
          break;
        case 70:
          setFadeActive(false);
          break;
      }
    } else {
      switch (e.keyCode) {
        case 70:
          setFadeActive(true);
          break;
      }
    }
  };

  if (pictures.length) {
    if (index > pictures.length - 1) handleNext();
  }

  // if (!pictures[index] && pictures) handleNext();

  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onKeyUp={(e) => handleKeyUp(e)}
      tabIndex={0}
      className={classes.root}
    >
      <Grid container justify="center" className={classes.grid} spacing={5}>
        {pictures?.length ? (
          pictures.map((picture: any, i: any) =>{
            if(!props.search){
              return (
                <Picture
                  key={i}
                  name={picture.name}
                  source={picture.source}
                  type={picture.type}
                  id={picture._id}
                  onClick={handleOpenFullWidth}
                />
              )
            }
            if(picture.name.includes(props.search)){
              return (
                <Picture
                  key={i}
                  name={picture.name}
                  source={picture.source}
                  type={picture.type}
                  id={picture._id}
                  onClick={handleOpenFullWidth}
                />
              )
            }
            return undefined
          })
        ) : (
          <h3>There is not images</h3>
        )}
      </Grid>
      <input
        className={classes.hidden}
        type="file"
        id="image-file"
        accept="image/*"
        onChange={handleChange}
      />
      <Fab
        type="button"
        className={classes.addBtn}
        color="primary"
        aria-label="add"
        onClick={handleUploaderBtn}
      >
        <ImageIcon />
      </Fab>
      <Box
        onDragLeave={(e) => handleDragLeave(e)}
        className={`${classes.dragZone} ${
          dragActive ? classes.dragZoneActive : ""
        }`}
      >
        <Box className={classes.inDragZone}>
          <Typography className={classes.dragZoneTxt}>
            DROP IMAGE HERE
          </Typography>
        </Box>
      </Box>
      {pictures.length ? (
        <Backdrop open={fadeActive} style={{ zIndex: 900 }}>
          <FullScreen
            handleChangeName={handleChangeName}
            handleDeletePicture={handleDeletePicture}
            onNext={handleNext}
            onBefore={handleBefore}
            index={index}
            onClick={handleFadeClose}
            pictures={pictures}
          />
        </Backdrop>
      ) : (
        ""
      )}

      {loading ? (
        <div className={classes.circularContainer}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
