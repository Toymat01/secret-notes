import { makeStyles } from '@material-ui/core/styles';




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

export {useStyles};