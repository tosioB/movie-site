import { Link } from 'react-router-dom';
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

function Movie({ item }) {
  return (
    <Link to={`/Detail/${item.id}`} className='movie'>
      <span className="img-box">
        <img src={IMG_BASE_URL + item.poster_path} alt={item.title} />
      </span>
      <div className='text-box'>
        <p className='title'>{item.title}({item.original_title})</p>
        <p className='date'>{item.release_date}</p>
        <p className='desc'>{item.overview}</p>
        <p>평점: {item.vote_average}</p>
        <p>평가참여수: {item.vote_count}명</p>
        <p>인기도: {item.popularity}점</p>
      </div>
    </Link>
  )
}

export default Movie;