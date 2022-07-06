import { ArrowRight } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from './firebase'
import{collection, addDoc} from 'firebase/firestore';



const Create = () => {
 const [title, setTitle] = useState('')
 const [details, setDetails] =useState('')
 const [titleError, setTitleError] = useState(false)
 const [detailsError, setDetailsError] =useState(false)
 const [category, setCategory] = useState('money')
 const navigate = useNavigate()
 const [user] = useAuthState(auth)


const handleSubmit = (e) =>{
    e.preventDefault();
    setTitleError(false)
    setDetailsError(false)
    if(title === ""){
         setTitleError(true)
        }
    if(details === ""){
          setDetailsError(true)
        }
  if(user && title && details){
    addDoc(collection(db, "notes"),{
        title,
        details,
        uid:user.uid,
        category
    }).then(() =>{
        navigate('/')
    }).catch((err) =>{console.log(err.message)})
  }
}

    return (
        <Container >
            <Typography color="textSecondary">
                Create Notes
            </Typography>
            <form noValidate autoComplete="off" >
                <TextField 
                   label="Notes Title" 
                   required
                   fullWidth
                   sx={{my:1}}  
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   error ={titleError}
                />
                <TextField 
                   label="Notes Details" 
                   required
                   fullWidth
                   sx={{my:1}} 
                   multiline
                   rows={5} 
                   value={details}
                   onChange={e => setDetails(e.target.value)}
                   error ={detailsError}
                />

                <FormControl sx={{my:2}}>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="Reminder" control={<Radio />} label="Reminder" />
                        <FormControlLabel value="Work" control={<Radio />} label="Work" />
                        <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
                    </RadioGroup>
                </FormControl>
            </form>
            <Button
                    endIcon={<ArrowRight />}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                   >
                     Submit
                </Button>
        </Container>
    );
}
 
export default Create;