import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";
const API_KEY = "cf31859b6bd120ef9abbc9990332f124";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const fetchMovies = async (pages) => { // 여러 페이지의 영화 데이터를 비동기적으로 가져오는 함수입니다.
  try {
    const responses = await Promise.all( // 페이지 배열을 기반으로 모든 페이지의 데이터를 병렬로 가져온다.
      pages.map((page) => fetch(`${BASE_URL}?language=ko&page=${page}&api_key=${API_KEY}`)) // 각 페이지에 대해 fetch 요청을 생성한다.
    )
    const data = await Promise.all(responses.map((res) => res.json())); // 모든 응답을 JSON으로 변환합니다.
    return data.flatMap((pageData) => pageData.results); // 각 페이지 데이터에서 영화 목록만 추출하고 평탄화한다.
  } catch (error) {
    console.error('Error fetching data:', error); // 오류가 발생하면 콘솔에 오류 메시지를 출력한다.
    throw error; // 오류를 다시 던져서 상위 호출 스택에서 처리할 수 있게 한다.
  }
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  console.log(data);

  useEffect(() => {
    const pages = [1, 2, 3, 4, 5];
    fetchMovies(pages) // fetchMovies 함수를 호출하여 영화 데이터를 가져온다.
      .then((movies) => { // 데이터가 성공적으로 가져와지면
        setData(movies); // 상태 변수 data를 영화 목록으로 업데이트한다.
        setLoading(false);
      })
      .catch((err) => { // 데이터 가져오는 도중 오류가 발생하면
        setError('Failed to load data'); // 오류 상태를 업데이트한다.
        setLoading(false);
      })
  }, []);

  return (
    <>
      {
        loading ? 'loading...' :
        data.map((item, index) => {
          return (
            <Link to={`/Detail${item.id}`} key={index}>
              <div>
                <span className="img=box">
                  <img src={IMG_BASE_URL + item.poster_path} alt={item.title} />
                </span>
                <p>{item.title}({item.original_title})</p>
                <p>{item.release_date}</p>
                <p>{item.overview}</p>
              </div>
            </Link>
          )
        })
      }
    </>
  )
}

export default Home; // Home 컴포넌트를 기본으로 내보냅니다.
