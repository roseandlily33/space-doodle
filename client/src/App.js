import Header from "./components/Header";
import Launch from "./pages/Launch";
import History from "./pages/History";
import Upcoming from "./pages/Upcoming";
import usePlanets from "./hooks/usePlanets";
import useLaunches from "./hooks/useLaunches";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ThemeProvider} from 'styled-components';

function App() {
  const planets = usePlanets();
  const {launches,
    upcoming,
    isPendingLaunch,
    submitLaunch,
    abortLaunch } = useLaunches();
    
  const theme = {
    yellow: '#fcba03',
    blue: '#03e8fc',
    green: '#03fc07',
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Launch planets={planets} submitLaunch={ submitLaunch} isPendingLaunch={isPendingLaunch} />}/>
        <Route path='history' element={<History  launches={launches}/>} />
        <Route path='upcoming' element={<Upcoming launches={upcoming} abortLaunch={abortLaunch} />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
