import { LockOpenOutlined } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import {auth, createUserWithEmailAndPassword,db} from "../firebase";
import {  collection, addDoc} from "firebase/firestore"
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'




const useStyles = makeStyles((theme) => {
    return{
        page:{
            textAlign:'center',
            padding:theme.spacing(5),
        },
       form:{
            margin: '0 auto', 
        },
        space:{
            marginBottom:'15px'
        },
        button:{
            marginRight:'10px'
        }
    }
})

const SignUp = () => {

    const navigate = useNavigate()

    const[name, setName] = useState('')
    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const [user, loading] =useAuthState(auth)

const signupWithEmail = (name,email,password) =>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred) =>{
        const user =cred.user
        console.log(user)
        addDoc(collection(db, 'users'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        }).catch((err) =>{
            alert(err.message)
        })
    });
};
const register = () =>{
    if(!name){
        alert('please fill all required field')
    }
    signupWithEmail(name, email, password)
}
useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

 const classes = useStyles();

    return (
        <Container className={classes.page}>
            <div className={classes.space}>
                <LockOpenOutlined color='secondary' />
                <Typography>Register</Typography>
            </div>
            <Stack
                    component="form"
                    spacing={2}
                    noValidate
                    autoComplete="off"
                    className={classes.form}
                    >
                    <TextField variant="outlined" label='Full Name' required  value={name} onChange ={(e => setName(e.target.value))}  />
                    <TextField variant="outlined" label='Email address' required  value={email} onChange ={(e => setEmail(e.target.value))} />
                     <TextField variant="outlined" label='Password' required   value={password} onChange ={(e => setPassword(e.target.value))} />
                    <Button variant="contained"  color='primary' onClick={register} className={classes.button}>Register</Button>
            </Stack>
        </Container>
    );
}
 
export default SignUp;