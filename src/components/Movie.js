import { Link } from 'react-router-dom';
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280";

function Movie({ item }) {
  const moviePoster = IMG_BASE_URL + item.poster_path;
  const moviePosterBg = IMG_BASE_URL + item.backdrop_path;
  return (
    <Link
      to={`/Detail/${item.id}`}
      className='movie'
      state={{
        title: item.title,
        desc: item.overview,
        release_date: item.release_date,
        vote_average: item.vote_average,
        vote_count: item.vote_count,
        popularity: item.popularity,
        moviePoster: moviePoster,
        moviePosterBg: moviePosterBg
      }}>
      <span className="img-box">
        <img src={moviePoster} alt={item.title} />
      </span>
      <div className='text-box'>
        <div>
          <p className='title'>{item.title}({item.original_title})</p>
          <p className='date'>{item.release_date}</p>
          <p className='desc'>{item.overview}</p>
        </div>
        <div className='eval-box'>
          <p>평점: <span>{item.vote_average.toFixed(1)}</span></p>
          <p>참여수: <span>{item.vote_count}</span>명</p>
          <p>인기도: <span>{item.popularity.toFixed(2)}</span></p>
        </div>
      </div>
    </Link>
  )
}

export default Movie;