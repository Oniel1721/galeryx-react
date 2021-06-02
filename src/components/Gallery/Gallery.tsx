import { useState, useEffect } from "react";
import io from 'socket.io-client'

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
import ContextMenu from "../ContextMenu";
import RenameDialog from "../RenameDialog";

import { base64StringToBlob, createObjectURL } from 'blob-util'
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

const Gallery = (props: any) => {
  const classes = useStyles();

  const socket = io('http://localhost:3500', {forceNew: true})
  socket.connect()

  console.log({socket})

  socket.emit('connection', {username: 'fulano'})
  const [pictures, setPictures] = useState<any>([]);

  const [dragActive, setDragActive] = useState(false);
  const [fadeActive, setFadeActive] = useState(false);
  const [loading, setLoading] = useState(getLoged());
  const [index, setIndex] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPositions, setContextMenuPositions] = useState({ x: 0, y: 0 })
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [renameValue, setRenameValue] = useState('')

  const emitActionEvent = () => {
    const username = getItem('username')
    socket.emit('action', { username })
    console.log('action')
  }

  const getPictures = () => {
    if (getItem("token")) {
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

  const handleDownload = (e: any) => {
    if (getItem("token")) {
      setLoading(true)
      API.downloadPicture(pictures[index]._id, (data: any) => {
        setLoading(false)
        const url = createObjectURL(base64StringToBlob(data.source, data.type))
        let type = data.type.includes('png') ? 'png' : 'jpg'
        let $a = document.createElement("a")
        $a.href = url
        $a.setAttribute("download", `${data.name}.${type}`)
        document.body.appendChild($a)
        $a.click()
        document.body.removeChild($a)
      })
    }
  }

  const handleBefore = (e: any) => {
    if (index > 0) setIndex(index - 1);
    else setIndex(pictures.length - 1);
  };

  const handleOnOpenInContextMenu = (e: any) => {
    setFadeActive(true)
  }

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
      emitActionEvent()
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
      emitActionEvent()
    });
  };

  const handleChangeName = (e: any) => {
    if (renameValue) {
      API.updatePictureName(pictures[index]._id, renameValue, (data: any) => {
        getPictures();
        emitActionEvent()
      });
      setRenameValue('')
      setShowRenameDialog(false)
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
      }
    }
  };

  const handleContextMenu = (e: any) => {
    if (e.target.parentNode.id.includes('context-menu-enable')) {
      e.preventDefault()
      let $all = e.target.parentNode.parentNode.childNodes;
      let $parent = e.target.parentNode;
      let indexOfClicked = Array.from($all).indexOf($parent);
      setIndex(indexOfClicked);
      setContextMenuPositions({ x: e.clientX, y: e.clientY })
      setShowContextMenu(true)
    }
  }

  const handleRenameDialogOpen = () => {
    setShowRenameDialog(true)
  }

  const handleRenameDialogClose = () => {
    setShowRenameDialog(false)
  }

  if (pictures.length) {
    if (index > pictures.length - 1) handleNext();
  }

  useEffect(() => {
    const socket = io('http://localhost:4000')
    socket.on('action', ({ username }) => {
      console.log({ username })
      // if(username === getItem('username')){
      //   if(getItem('token')){
      //     API.getPictures((data:any)=>{
      //       setPictures(data)
      //     })
      //   }
      // }
    })
  }, [])


  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onKeyUp={(e) => handleKeyUp(e)}
      tabIndex={0}
      onClick={() => { setShowContextMenu(false) }}
      onContextMenu={handleContextMenu}
      className={classes.root}
    >
      <RenameDialog
        onSubmit={handleChangeName}
        onChange={(value: any) => { setRenameValue(value) }}
        inputValue={renameValue} onOpen={handleRenameDialogOpen}
        onClose={handleRenameDialogClose}
        open={showRenameDialog}
      />
      <Grid container justify="center" className={classes.grid} spacing={5}>
        {pictures?.length ? (
          <>
            {pictures.map((picture: any, i: any) => {
              if (!props.search) {
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
              if (picture.name.toUpperCase().includes(props.search.toUpperCase())) {
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
            })}
            {showContextMenu
              &&
              <ContextMenu
                posX={contextMenuPositions.x}
                posY={contextMenuPositions.y}
                onDelete={handleDeletePicture}
                onChangeName={handleRenameDialogOpen}
                onDownload={handleDownload}
                onOpen={handleOnOpenInContextMenu}
                close={() => { setShowContextMenu(false) }}
              />}
          </>) : (
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
        className={`${classes.dragZone} ${dragActive ? classes.dragZoneActive : ""
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
            handleChangeName={handleRenameDialogOpen}
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
