import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavascriptLogo } from './assets/JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction={'row'} gap={2} alignContent={'center'} justifyContent={'center'}>
          <JavascriptLogo />
          <Typography variant='h2' component={'h1'}>
            Javascript Quizz
          </Typography>
        </Stack>
        {
          questions.length === 0 ? <Start /> : <Game />
        }
      </Container>
    </main>
  )
}

export default App
