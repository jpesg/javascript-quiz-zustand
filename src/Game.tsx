import { Card, Typography, List, ListItem, ListItemButton, ListItemText, Stack, IconButton } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { Question as QuestionType } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)
    const handleClick = (answerIndex: number) => () => selectAnswer(info.id, answerIndex)
    const getBgColor = (index: number) => {
        const { userSelectedAnswer, correctAnswer } = info
        if (userSelectedAnswer == null) {
            return 'transparent'
        }
        if (index !== correctAnswer && index !== userSelectedAnswer) {
            return 'transparent'
        }
        if (index === correctAnswer) {
            return 'green'
        }
        if (index === userSelectedAnswer) {
            return 'red'
        }
        return 'transparent'
    }

    return (
        <Card variant="outlined" sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}>
            <Typography variant="h5">
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={handleClick(index)}
                            sx={{ backgroundColor: getBgColor(index) }}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>)
                )}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]



    return (
        <>
            <Stack direction={'row'} gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}