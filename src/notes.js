import { Grid, Typography} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect,useState } from "react";
import NoteCard from "./components/NoteCard";
import { auth,db } from "./firebase";
import { collection, deleteDoc, getDocs ,query, where, doc} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const Notes = () => {
    const[notes, setNotes] =useState([]);
    const [user] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true);
    
  

        useEffect(() => {
            if(user){
                const q = query (collection(db,'notes'), where('uid', '==',  user?.uid));
                    getDocs(q)
                    .then((res) => {
                        const data = res.docs.map(doc => {
                            return {...doc.data(), id: doc.id}
                        })
                        setIsLoading(false);
                        setNotes(data)
                    }).catch(err => console.log(err.message))
            }
        }, [user]); 

        const handleDelete = (id) =>{
            deleteDoc(doc(db,"notes", `${id}`))
                const newNotes = notes.filter(note => note.id !== id)
                setNotes(newNotes);
                console.log(id)  
        }

        if(user){
            return (
                <Container>
                    {isLoading && <Typography variant="h5" textAlign={"center"}>Fetching Data...</Typography>}
                    <Grid container spacing={3}>
                        {notes.map(note =>(
                            <Grid item key={note.id} xs={12} lg={4} md={6} >
                                <NoteCard note={note} handleDelete={handleDelete} id = {note.id} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            );
        }else{
            return(
                <Container>
                    <Typography variant="h4" textAlign={'center'}>
                        Please login to  see your  notes
                    </Typography>
                </Container>
            )
        }

   
}
 
export default Notes;