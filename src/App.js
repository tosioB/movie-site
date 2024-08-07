import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Detail from './components/Detail';

function App() {
  return (
    <>
      {/* <div>
        <Link to="/Home">HOME</Link>
        <Link to="/Detail">DETAIL</Link>
      </div> */}
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Detail/:id' element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;

// 'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
// `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`