import { Card, CardContent, RadioGroup, FormControlLabel, Radio, FormHelperText, makeStyles } from "@material-ui/core";
import React from "react";

function Question(props: any){

    const {question, paperState, setPaperState, showAnswers, showAllAnswers } = props;
    const classes = useStyles();

    const [isChoicesDisabled, setIsChoicesDisabled] = React.useState(false);
    const [showHelperText, setShowHelperText] = React.useState('');

    let correctAnswer = '';

    for(const property in question.choices){
      if(question.choices[property].correct_answer) correctAnswer = property;
    }

    function updateHelperText(response: string){
      if(response === correctAnswer){
        setShowHelperText('Correct!');
      } else {
        setShowHelperText(`Incorrect. The correct answer is ${correctAnswer}`);
      }
    }

    const handleChoiceSelect = (event: any) => {
      let response = event.target.value;
  
      setPaperState({
        ...paperState,
        [question.qno]:{
          response,
          correct: question.choices[`${response}`].correct_answer,
        }
        }
      );

      updateHelperText(response);
      if(showAnswers) setIsChoicesDisabled(true);
      
      }
return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <p>{question.qno}. {question.description}</p>
        </CardContent>
        <div>
        <div className={classes.choicesWrapper}>
        <RadioGroup aria-label="choices" name="choices" onChange={handleChoiceSelect}>
            <FormControlLabel value="A" control={<Radio color="primary" disabled={isChoicesDisabled || showAllAnswers} />} label={`A. ${question.choices['A'].description}`}/>
            <FormControlLabel value="B" control={<Radio color="primary" disabled={isChoicesDisabled || showAllAnswers} />} label={`B. ${question.choices['B'].description}`}/>
            <FormControlLabel value="C" control={<Radio color="primary" disabled={isChoicesDisabled || showAllAnswers} />} label={`C. ${question.choices['C'].description}`}/>
            <FormControlLabel value="D" control={<Radio color="primary" disabled={isChoicesDisabled || showAllAnswers} />} label={`D. ${question.choices['D'].description}`}/>
      </RadioGroup>
      <FormHelperText>{showAnswers? 
                        (showAllAnswers && showHelperText === ''?`Incorrect. The correct answer is ${correctAnswer}`:showHelperText):''}</FormHelperText>
        </div>
        </div>
      </div>
    </Card>
)
}

export default Question;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '500px'
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
    content: {
      textAlign: 'left'
      },
      choicesWrapper: {
        paddingLeft: '15px'
      }
    }));