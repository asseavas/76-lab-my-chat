import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import Chat from './features/messages/Chat';
import './App.css';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container component="main">
        <Chat />
      </Container>
    </>
  );
};

export default App;
