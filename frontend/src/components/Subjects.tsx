import { Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useGetSubjects } from "../hooks/subject";
function Subjects(){
    const classes = useStyles();
    let history = useHistory();
    const { isLoading, data = [], error } = useGetSubjects();
    
    const navigateToSubject = (subject: string) => {
        history.push(`Subjects/${subject}`)
    }
    const subjectsToRender = data.map((subject: { name: string}) => 
        <li className={classes.buttonList} key={subject.name}>
            <Button 
                variant="contained" 
                className={classes.button} 
                onClick={() => navigateToSubject(subject.name)}
                >
                {subject.name}
            </Button>
        </li>
    )
  
    return (
        <Container maxWidth="md" className={classes.container}>
        <h2>Revision Past Papers</h2>
        <ul>{subjectsToRender}</ul>
        </Container>
    )
}

export default Subjects;

const useStyles = makeStyles((theme) => ({
    container:{
        textAlign: 'left',
    },
    buttonList:{
        float: 'left',
        listStyle: 'none',
        marginRight: '20px',
    },
    button: {
        width: '400px',
        borderRadius: '5px',
        color: "#000",
        textTransform: 'none',
        marginBottom: '10px',
        "&:hover": {
            color: "#FFF",
            backgroundColor: '#1865f2',
        },
    }
  }));