import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Detail from './components/Detail';
import Search from './components/Search';

function App() {
  return (
    <>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Detail/:id' element={<Detail />} />
        <Route path='/Search' element={<Search />} />
      </Routes>
    </>
  );
}

export default App;