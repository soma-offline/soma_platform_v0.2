import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { addKCPEPaper, uploadImage } from "../api/addPaper";

function Addpaper(){
    const classes = useStyles();
    const indexShortQuestions = Array.from({length: 60}, (_, i) => i + 1);
    const indexSectionQuestions = Array.from({length: 30}, (_, i) => i + 1);
    const initialState: any = {};
    const [sectionQuestionImages, setSectionQuestionImages] = React.useState(initialState);


    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });

    const saveSQImage = async (event: any) => {       
        const file = event.target.files[0];
        if (!file) return;

        const data = {
            file: await toBase64(file),
            fileName: file.name
        }

        uploadImage(data).then(res => {
            setSectionQuestionImages({
                ...sectionQuestionImages,
                [event.target.name]: res.data
            });

        }).catch(err => {
            alert("Image could not be added. Please try again");
            console.error(err);
        })
        
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const paper: any = {
            paperInfo: {
                title: event.target.title.value,
                paper_year: event.target.paper_year.value, 
                grade: event.target.grade.value,
                subject: event.target.subject.value,
            },
            shortQuestions: [],
            sectionQuestions: [],
            };
            indexShortQuestions.forEach(i => {
                const shortQuestionDescription = event.target[`${i}desc`].value.replaceAll("'","");
                const choiceA = event.target[`${i}A`].value.replaceAll("'","");
                const choiceB = event.target[`${i}B`].value.replaceAll("'","");
                const choiceC = event.target[`${i}C`].value.replaceAll("'","");
                const choiceD = event.target[`${i}D`].value.replaceAll("'","");
                const correct_answer = event.target[`${i}Correct`].value;
                
                if(shortQuestionDescription && choiceA && choiceB && choiceC && choiceD && correct_answer){
                    const shortQuestion = {
                        number: i,
                        shortQuestionDescription,
                        choices:{
                            A: choiceA,
                            B: choiceB,
                            C: choiceC,
                            D: choiceD,
                        },
                        correct_answer,
                    }
                    paper.shortQuestions.push(shortQuestion);
                     }
            }
    );

        indexSectionQuestions.forEach(i => {
            const sectionQuestionDescription = event.target[`sq${i}desc`].value;
            const imageURL = sectionQuestionImages[`sq${i}Image`];
            const noOfFirstQuestion = event.target[`sq${i}firstsq`].value;

            if(sectionQuestionDescription !== '' || imageURL !== undefined){
            const sectionQuestion = {
                sectionQuestionDescription,
                noOfFirstQuestion,
                imageURL,
            }
            paper.sectionQuestions.push(sectionQuestion);
        }
            });
    console.log(paper);
    addKCPEPaper(paper).then(res => {
        if(res.status === 201) alert("Paper added successfully");
    }).catch(err => {
        alert("Paper could not be added. Please try again");
        console.log(err);
    });
    }

  
    const shortQFieldsToRender = indexShortQuestions.map(i => 
        <li className={classes.questionList} key={`${i}shortQuestion`}>
         <div className={classes.questionContainer}>
            <TextField
                    className={classes.questionsTextField}
                    label={`No ${i}`}
                    name={`${i}desc`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                <p>Choices</p>
                <TextField
                    className={classes.textField}
                    label="A"
                    name={`${i}A`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                <TextField
                    className={classes.textField}
                    label="B"
                    name={`${i}B`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                <TextField
                    className={classes.textField}
                    label="C"
                    name={`${i}C`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                <TextField
                    className={classes.textField}
                    label="D"
                    name={`${i}D`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                <p>Correct Answer</p>
                <TextField
                    className={classes.textField}
                    label="Correct Answer"
                    name={`${i}Correct`}
                    variant="outlined"
                    size="small"
                    required={i <= 30}
                />
                    </div>
                <hr></hr>
        </li>
    )

    const sectionQFieldsToRender = indexSectionQuestions.map(i => 
        <li className={classes.questionList} key={`${i}sectionQuestion`}>
            <div>
            <TextField
                className={classes.sqTextField}
                multiline={true}
                rows={3}
                label="Description"
                name={`sq${i}desc`}
                variant="outlined"
                size="small"
            />
            <TextField
                className={classes.textField}
                label="No of first short question"
                name={`sq${i}firstsq`}
                variant="outlined"
                size="small"
                placeholder="20"
                helperText="No of the first short question that follows this section question's diagram or description. e.g 1"
            />
             <input
                    accept="image/*"
                    className={classes.input}
                    name ={`sq${i}Image`}
                    id={`contained-button-file-${i}`}
                    multiple
                    type="file"
                    onChange={saveSQImage}
                />
                <label htmlFor={`contained-button-file-${i}`}>
                    <Button
                        variant="outlined"
                        component="span"
                        className={classes.button}
                    >
                        {sectionQuestionImages[`sq${i}Image`] === undefined
                            ? "Upload Image"
                            : "Image added"}
                    </Button>
                </label>
            </div>
            <hr></hr>
            </li>
    )
    return (
                <Container className={classes.root}>
                        <form onSubmit={handleSubmit}>
                            <h3>
                                <u>Paper Information</u>
                            </h3>
                            <TextField
                                className={classes.textField}
                                label="Title"
                                placeholder="KCPE Revision Past Paper"
                                name="title"
                                variant="outlined"
                                size="small"
                                required
                            />
                            <TextField
                                className={classes.textField}
                                label="Year"
                                placeholder="2020"
                                name="paper_year"
                                variant="outlined"
                                size="small"
                                required
                            />
            
                         <TextField
                                className={classes.textField}
                                label="Grade / Std"
                                placeholder="8"
                                name="grade"
                                variant="outlined"
                                size="small"
                                required
                            />  
                            <TextField
                                className={classes.textField}
                                label="Subject"
                                placeholder="MATH"
                                name="subject"
                                variant="outlined"
                                size="small"
                                required
                                helperText='Note: Only add subject code. E.g ENGL, KISW, SS, CRE etc. Max 4 characters'
                            />  
            
                            <br></br>
                            <h3>
                                <u>Short Questions</u>
                            </h3>
                            {shortQFieldsToRender}
                            <h3>
                                <u>Section Questions</u>
                            </h3>
                            {sectionQFieldsToRender}
                            <div className={classes.submitBtnWrapper}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitBtn}
                            >
                                    Add paper
                            </Button>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            </form>
                            </Container>
    )
}

export default Addpaper;

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    input: {
        display: "none",
    },
    button: {
        textTransform: "none",
        minWidth: 230,
        minHeight: 40,
    },
    textField: {
        width: "230",
        marginRight: 15,
        marginBottom: 10,
        display: "inline-grid",
    },
    sqTextField: {
        width:"100%",
        marginBottom: 10,
    },
    questionContainer: {
        alignContent: "left"
    },
    questionsTextField: {
        width: "100%",
    },
    submitBtnWrapper: {
        display: "flex",
        justifyContent: "center",
    },
    submitBtn: {
        width: 200,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        backgroundColor: "#123242",
        color: "#FFF",
        "&:hover": {
            backgroundColor: "#FF9900",
            color: "#000",
        },
    },
    questionList:{
        listStyle: 'none',
    },
    loading: {
        color: "#00569c",
    },
}));
