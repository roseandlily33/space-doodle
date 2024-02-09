import Header from "./components/Header";
import Launch from "./pages/Launch";
import History from "./pages/History";
import Upcoming from "./pages/Upcoming";
import usePlanets from "./hooks/usePlanets";
//import useLaunches from "./hooks/useLaunches";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ThemeProvider} from 'styled-components';

function App() {
  const planets = usePlanets();
  console.log('Use Planets App', planets);
  // const {launches,
  //   isPendingLaunch,
  //   submitLaunch,
  //   abortLaunch } = useLaunches();
  // console.log('Use Launches App', launches);
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
        <Route path='/' element={<Launch planets={planets} />}/>
        <Route path='history' element={<History />} />
        <Route path='upcoming' element={<Upcoming />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
