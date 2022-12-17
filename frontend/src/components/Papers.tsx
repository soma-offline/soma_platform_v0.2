import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useGetPapers } from "../hooks/paper";

function Papers(){
    const classes = useStyles();
    let history = useHistory();
    const { subject }: {subject: string} = useParams();
    const { isLoading, data = [], error } = useGetPapers(subject);
    
    const navigateToPaper = (paperTitle: string, paperYear: string) => {
        history.push(`/${subject.trim()}/${paperTitle}_${paperYear}`)
    }
    
    const papersToRender = data.map((paper: { title: string; paper_year: string; }) => 
        <li className={classes.buttonList} key={`${paper.title}_${paper.paper_year}`}>
            <Button 
                variant="contained" 
                className={classes.button} 
                onClick={() => navigateToPaper(paper.title, paper.paper_year)}
                >{`${paper.title}`}
            </Button>
        </li>
    )

    return(
        <Container maxWidth="md" className={classes.container}>
        <h2>{subject} Revision Past Papers</h2>
        <ul>{papersToRender}</ul>
        </Container>
    )
}

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

export default Papers;
