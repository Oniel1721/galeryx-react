import { makeStyles } from "@material-ui/styles"
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";


interface contextMenuProps {
    posX: number;
    posY: number;
    close: Function;
    onDelete: Function;
    onChangeName: Function;
    onOpen: Function;
    onDownload: Function;
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        fontStyle: 'none',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        borderRadius: '12px',
        boxShadow: '3px 3px 3px gray',
        overflow: 'hidden',
    },
    delete: {
        color: 'crimson',
    },
    li: {
        fontWeight: 'bold',
        letterSpacing: '2px',
        padding: '12px 8px',
        "&:hover": {
            backgroundColor: '#d3d3d3'
        },
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    span: {
        marginRight: '16px'
    }
})


const ContextMenu = (props: contextMenuProps) => {
    const classes = useStyles()
    const options = [
        {
            text: 'Open',
            icon: <FullscreenIcon />,
            action: props.onOpen,
            isDelete: false
        },
        {
            text: 'Download',
            icon: <GetAppIcon />,
            action: props.onDownload,
            isDelete: false
        },
        {
            text: 'Rename',
            icon: <EditIcon />,
            action: props.onChangeName,
            isDelete: false
        },
        {
            text: 'Delete',
            icon: <DeleteOutlineOutlinedIcon />,
            action: props.onDelete,
            isDelete: true
        },
    ]

   

    return (
        <ul style={{ position: 'absolute', top: props.posY, left: props.posX, zIndex: 1000, }} className={classes.root}>
            {options.map((opt, i) => (
                <li className={`${classes.li} ${opt.isDelete ? classes.delete : ''}`} key={i} onClick={(e)=>{
                    props.close()
                    opt.action(e)
                }}><span className={classes.span}>{opt.icon}</span>{opt.text}</li>
                )
            )}
        </ul>
    )
}

export default ContextMenu