import Header from "./components/Header";
import Launch from "./pages/Launch";
import History from "./pages/History";
import Upcoming from "./pages/Upcoming";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Launch />}/>
        <Route path='history' element={<History />} />
        <Route path='upcoming' element={<Upcoming />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
