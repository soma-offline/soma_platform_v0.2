import { Button, Container, FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/paper";
import SectionQuestion from "./SectionQuestion";
import ShortQuestion from "./ShortQuestion";

function Paper(){
    let { paper }: {paper: string} = useParams();
    const [showAnswers, setShowAnswers ] = React.useState(true);
    const [showAllAnswers, setShowAllAnswers ] = React.useState(false);
    const [isFinished, setIsFinished ] = React.useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = React.useState(!showAnswers);
    const initialPaperState: any = {};
    const [paperState, setPaperState] = React.useState(initialPaperState);
    const classes = useStyles();
    const { isLoading, data = [], error } = useGetPaper(paper);

    // add loading indicator

    let shortQuestions: any = Object.values((!isLoading)? data.shortQuestions: {});


    const sectionQuestions: any = {};
    
    if(!isLoading){
      data.sectionQuestions.forEach((question: any) => sectionQuestions[question.first_short_qno] = {
        figure: question.figure,
        description: question.description
      });
  }
  
    const questionsToRender = [];

    if(!isLoading){
    let sectionQuestionNos = data.sectionQuestions.map((question: any) => question.first_short_qno);
    for(const question of shortQuestions){
      if(sectionQuestionNos.includes(parseInt(question.qno))){
        const sectionQuestion = sectionQuestions[question.qno];
       questionsToRender.push(<li className={classes.questionList} key={`section_${question.qno}`}>
          <SectionQuestion {...sectionQuestion}/>
         <br></br>
      </li>)
        sectionQuestionNos = sectionQuestionNos.filter((no:number) => no !== question.qno);
      }
      questionsToRender.push(<li className={classes.questionList} key={question.qno}>
        <ShortQuestion {...{question, paperState, setPaperState, showAnswers, showAllAnswers}} />
       <br></br>
    </li>)
    }
  }


    const submitPaper = () => {
        setShowAnswers(true);
        setShowAllAnswers(true);
    }

    const calculateScore = () => {
      let score = 0;
      for(const response in paperState){
        if(paperState[response]['correct']) score++;
      }
      return score;
    }
    
    return(
       !isFinished? 
       <div>
        <h3>{paper}</h3>
           <div>
           <FormControlLabel
       control={
         <Switch
           checked={showAnswers}
           onChange={()=> {setShowAnswers(!showAnswers); setShowSubmitBtn(showAnswers)}}
           name="showAnswersToggle"
           color="primary"
         />
       }
       label={showAnswers?`Showing correct answers after each question`:`Hiding correct answers till end`}
     /></div> 
    <Container maxWidth="sm" className={classes.container}>
    <ul>{questionsToRender}</ul>
    {showSubmitBtn? <Button 
                variant="contained" 
                className={classes.button} 
                onClick={() => submitPaper()}
                >Show Answers
            </Button> : ''}
<Button 
                variant="contained" 
                className={classes.button} 
                onClick={() => setIsFinished(true)}
                >Finish 
            </Button>

    </Container>
    </div> :
    <div>{`${calculateScore() >= 40 ? 'Well done!': ''} You scored ${calculateScore()} on this paper.`} Here are some more <Link to="/">practice papers</Link> for you!</div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      container:{
        textAlign: 'left',
    },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
    questionList:{
        float: 'left',
        listStyle: 'none',
        marginRight: '20px',
    },
    question: {
        width: '200px'
    },
    button: {
        width: '200px',
        textTransform: 'none',
        "&:hover": {
          backgroundColor: "#FF9900",
          color: "#000",
      },

    }
  }));

export default Paper;
