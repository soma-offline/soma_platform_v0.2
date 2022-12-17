export type Paper = {
     paperInfo: {
            title: string,
            paper_year: string, 
            grade: string,
            subject: string
        },
        shortQuestions: [{
            number: number,
            shortQuestionDescription: string,
            choices:{
                A: string,
                B: string,
                C: string,
                D: string,
            },
            correct_answer: string
        }],
        sectionQuestions: [{
            sectionQuestionDescription: string
            noOfFirstQuestion: number,
            imageURL: string
        }],
};