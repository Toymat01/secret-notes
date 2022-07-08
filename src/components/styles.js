import { makeStyles } from '@material-ui/core/styles';
import { blue, green, yellow ,pink } from "@material-ui/core/colors";



const drawerWidth = 240
const useStyles = makeStyles((theme) => {
    return{
        userPage:{
            textAlign:'center',
            padding:theme.spacing(5),
        },
        space:{
            marginBottom:'15px'
        },
        page:{
            width:'100%',
            backgroundColor:"#f9f9f9",
            padding:theme.spacing(3)
        
          },
          drawer:{
            width: drawerWidth
          },
          drawerPaper:{
            width: drawerWidth
          },
          root:{
            display:"flex"
          },
          active:{
            background:"#f4f4f4"
          },
          title:{
            padding:theme.spacing(2)
          },
          appbar:{
            width:`calc(100% - ${drawerWidth}px)`
          },
          toolbar:theme.mixins.toolbar,
          date:{
            flexGrow: "1",
          },
          avatar:{
            marginLeft: theme.spacing(2)
          },
          profile:{
            display:"none"
          },
          button:{
            display:"none"
          }
    }
})

const avatarBgColor = (note) => {
    if (note.category === "Work"){
      return yellow[800];
    }
    if (note.category === "money"){
      return green[800];
    }
    if (note.category === "Todos"){
      return pink[500];
    } else {
      return blue[700];
    }
  };

export {useStyles, avatarBgColor};