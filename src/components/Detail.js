import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();

  return (
    <>
      {/* <Link to={`/Home`} className="home btn">홈으로 가기</Link> */}
      <div className="detail-page">
        <span className="bg-img-box">
          <img src={location.state.moviePosterBg} className="bg-img" />
        </span>
        <div className="movie-info">
          <span className="img-box">
            <img src={location.state.moviePoster} />
          </span>
          <div className="text-box">
            <p className="title">{location.state.title}</p>
            <p className="date">{location.state.release_date}</p>
            <div className="eval-box">
              <p>평점: <span>{location.state.vote_average.toFixed(1)}</span></p>
              <p>참여수: <span>{location.state.vote_count}</span>명</p>
              <p>인기도: <span>{location.state.popularity.toFixed(2)}</span></p>
            </div>
            <p className="desc">{location.state.desc}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail;