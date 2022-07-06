import {   Button, Container, TextField, Typography } from "@material-ui/core";
import { LockOpenOutlined } from "@mui/icons-material";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Stack } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles((theme) => {
    return{
        page:{
            textAlign:'center',
            padding:theme.spacing(5)
        },
        link:{
            margin:'10px auto',
        },
        form:{
            margin: '0 auto', 
        },
        space:{
            marginBottom:'15px'
        },
    }
});


const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const[email,setEmail] = useState('')
    const[password, setPassword] =useState('');
    const [user, loading] = useAuthState(auth)


    const login = (email, password) =>{
        signInWithEmailAndPassword(auth,email,password)
        .then((res) =>{
            console.log(res)
        })
        .catch((err) =>{
            alert(err.message)
        })
    };

    useEffect(() =>{
        if(loading){
            return;
        }
        if(user){
            navigate('/')
        }
    },[user,loading])

    return (
        <Container className={classes.page}>
            <div className={classes.space} >
                <LockOpenOutlined color='secondary' />
                <Typography>Sign in</Typography>
            </div>
               <Stack
                    component="form"
                    spacing={2}
                    noValidate
                    autoComplete="off"
                    className={classes.form}
                    >
                        <TextField variant="outlined"  label='Email address' required  value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField variant="outlined"  label='Password' required  value={password} onChange={e => setPassword(e.target.value)}  />
                        <Button color='primary' variant="contained" onClick= {() => login(email,password)} >Sign in</Button>    
                       {/* <div className={classes.link}>
                        <a href="/" > forgot password?</a>
                        <a href="/">Dont have an account? sign up</a>
                    </div> */}
               </Stack>
             
         </Container>
    );
}
 
export default Login;