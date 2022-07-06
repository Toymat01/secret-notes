import {  Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutline, AssignmentIndOutlined, Logout, SubjectOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Toolbar } from "@material-ui/core";
import {format} from 'date-fns';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase'
import { useState, useEffect } from "react";
import {signOut} from 'firebase/auth'
import {query, collection,where, getDocs} from 'firebase/firestore';
import { Box } from "@mui/system";
import { deepOrange} from '@mui/material/colors';

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
  return{
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

const menuItems = [
  {
    text: 'My Notes',
    icon:<SubjectOutlined color="secondary" />,
    path: '/'
  },
  {
    text: 'Create Note',
    icon:<AddCircleOutline color="secondary" />,
    path: '/create'
  },
]

const menuItem = [
  {
    text: 'Login',
    icon:<AssignmentIndOutlined color='secondary' />,
    path: '/login'
  },
  {
    text: 'Sign up',
    icon:<AssignmentIndOutlined color='secondary' />,
    path: '/signup'
  }
]



export default function Layout({children}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [user,loading] = useAuthState(auth);
  const [name, setName] = useState('');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 

  const fetchUserName = () =>{
    const q = query (collection(db,'users'), where('uid','==', user?.uid));
    getDocs(q)
    .then((doc) =>{
      const data = doc.docs[0].data()
      setName(data.name)
    }).catch((err) =>{
      alert('could not fetch this user')
      console.log(err.message)
    })
  };

 
 
  useEffect(() =>{
    if(loading){
      return;
    }
    if(user){
      fetchUserName();
    }
  },[ navigate, loading, user])

  const logout = () =>{
    signOut(auth);
    navigate('/');
  }


  return (
    <div className={classes.root}>
      <AppBar  elevation={0}>
        <Toolbar >
          <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2,}}
              >
                <MenuIcon />
              </IconButton>
          <Typography className={classes.date}>
            Today is the {format (new Date(), 'do MMMM Y')}
          </Typography>
          <Box className={!user ? classes.profile : null}>
            <Box sx={{display:{sm:'flex', xs:'none'}}} alignItems="center" >
              {name && <Typography color="success" sx={{marginRight:2}}>Welcome {name.toLocaleUpperCase()}</Typography>}
              <Avatar src="/cartoon.jpeg"  /> 
            </Box>
            <Box sx={{display:{xs:'flex', sm:'none'}}}>
              <Avatar sx={{bgcolor:deepOrange[500]}}>{name[0]}</Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant="temporary"
        className={classes.drawer}
        classes={{paper:classes.drawerPaper}}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <div>
            <Typography variant="h5" className={classes.title} color="secondary" >
              Secret Notes
            </Typography>
          </div>
          <List className={!user ? classes.button : null}>
            {menuItems.map(item =>(
              <ListItem key={item.text} button onClick={() => navigate(item.path)} className={location.pathname === item.path ? classes.active : null}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            ))}
            <ListItem button onClick={logout}  >
              <ListItemIcon><Logout color="secondary"/></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </List>
          <List className={user ? classes.button : null}>
            {menuItem.map(item => (
                <ListItem key={item.text} button onClick={() => navigate(item.path)} className={location.pathname === item.path ? classes.active : null}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>    
       <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
       </div>
    </div>
  )
}
