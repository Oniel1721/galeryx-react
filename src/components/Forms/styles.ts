import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        padding: theme.spacing(5),
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 'bold',
        borderRadius: '5%',
        minWidth: theme.spacing(25),
        [theme.breakpoints.up(420)]:{
            minWidth: theme.spacing(35),

        },
        [theme.breakpoints.up(720)]:{
            minWidth: theme.spacing(50),

        },
        transition: 'all 0.3s ease-in-out'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: theme.spacing(4),

    },
    subTitle:{
        textAlign: 'center',
        marginBottom: theme.spacing(3)
    },
    span:{
        color: theme.palette.primary.light,
        cursor: 'pointer',
    },
    textField: {
        marginBottom: theme.spacing(3)
    },
    hidden:{
        position: 'absolute',
        transform: 'scale(0)'
    }
})



export default useStyles