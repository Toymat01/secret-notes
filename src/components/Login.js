import {   Button, Container, TextField, Typography } from "@material-ui/core";
import { LockOpenOutlined } from "@mui/icons-material";
import { useStyles } from "./styles";
import {  Stack } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";





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
        <Container className={classes.userPage}>
            <div className={classes.space} >
                <LockOpenOutlined color='secondary' />
                <Typography>Sign in</Typography>
            </div>
               <Stack
                    component="form"
                    spacing={3}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField variant="outlined"  label='Email address' required  value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField variant="outlined"  type="password" label='Password' required  value={password} onChange={e => setPassword(e.target.value)}  />
                        <Button color='primary' variant="contained" onClick= {() => login(email,password)} >Sign in</Button>    
               </Stack>
             
         </Container>
    );
}
 
export default Login;