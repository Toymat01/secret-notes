import { blue, green, yellow ,pink } from "@material-ui/core/colors";
import {  DeleteOutlined } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";



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

const NoteCard = ({note, handleDelete, id}) => {
    return (
        <div>
            <Card spacing={3}>
                <CardHeader 
                    avatar={
                        <Avatar sx={{bgcolor:avatarBgColor(note) }}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={(e) => handleDelete(id, e)}>
                            <DeleteOutlined   />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default NoteCard;