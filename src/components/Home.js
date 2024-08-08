import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from '../data/movie_key'
import Movie from './Movie'
import Search from "./Search";

const fetchMovies = async (pages) => { // 여러 페이지의 영화 데이터를 비동기적으로 가져오는 함수
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
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [data, setData] = useState([]); // 데이터 저장
  const [error, setError] = useState(null); // 에러
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 페이지 상태
  const [sortedOption, setSortedOption] = useState('a'); // 정렬 기준 저장
  const [sortedData, setSortedData] = useState(data); // 정렬된 데이터 저장
  const PER_PAGE = 12; // 보여지는 페이지 수

  useEffect(() => { // 데이터 호출 기능
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  useEffect(() => { // 스크롤 기능
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 1) {
        if (hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  useEffect(() => { // 정렬 기능
    const sortData = [...data].sort((a, b) => {
      switch (sortedOption) {
        case 'a':
          return a.title.localeCompare(b.title); // 가나다순
        case 'b':
          return b.title.localeCompare(a.title); // 가나다역순
        case 'c':
          return b.vote_average - a.vote_average; // 평점 높은순
        case 'd':
          return a.vote_average - b.vote_average; // 평점 낮은순
        case 'e':
          return b.vote_count - a.vote_count; // 평가 참여 높은순
        case 'f':
          return a.vote_count - b.vote_count; // 평가 참여 낮은순
        case 'g':
          return b.popularity - a.popularity; // 인기 높은순
        case 'h':
          return a.popularity - b.popularity; // 인기 낮은순
        default:
          return 0;
      }
    });

    setSortedData(sortData);
  }, [sortedOption, data]);

  const handleSortChange = (event) => {
    setSortedOption(event.target.value);
  };

  return (
    <>
      <div className="movie-site">
        <Search sortedOption={sortedOption} handleSortChange={handleSortChange} />
        <div className="movie-box">
          {
            loading ? 'loading...' :
            sortedData.slice(0, page * PER_PAGE).map((item, index) => {
              return (
                <Movie key={index} item={item} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Home;