import { useEffect, useState } from "react";
import { BASE_URL } from '../data/movie_key'
import Movie from './Movie'
import Search from "./Search";

const API_KEY = process.env.REACT_APP_API_KEY;

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
  const [filterData, setFilterData] = useState([]); // 데이터 저장
  const [filterDataStatus, setFilterDataStatus] = useState(false)
  const [error, setError] = useState(null); // 에러
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 페이지 상태
  const [sortedOption, setSortedOption] = useState('z'); // 정렬 기준 저장
  // const [sortedData, setSortedData] = useState([]); // 정렬된 데이터 저장
  const [searchInput, setSearchInput] = useState("");
  // const [searchStatus, setSearchStatus] = useState(false);
  const PER_PAGE = 12; // 보여지는 페이지 수

  useEffect(() => { // 데이터 호출 기능
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const pages = [1];
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
    let newFilterData = [...data];

    if (searchInput) {
      newFilterData = newFilterData.filter((item) => {
        return item.title.toLowerCase().includes(searchInput.toLowerCase())
        // toLowerCase - 문자열을 소문자로 변환하는 메서드
      });
    }

    switch (sortedOption) { // 정렬
      case 'a':
        newFilterData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'b':
        newFilterData.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'c':
        newFilterData.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'd':
        newFilterData.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case 'e':
        newFilterData.sort((a, b) => b.vote_count - a.vote_count);
        break;
      case 'f':
        newFilterData.sort((a, b) => a.vote_count - b.vote_count);
        break;
      case 'g':
        newFilterData.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'h':
        newFilterData.sort((a, b) => a.popularity - b.popularity);
        break;
      default:
        break;
    }

    setFilterData(newFilterData); // 필터링 및 정렬된 데이터로 업데이트
  }, [searchInput, sortedOption, data]);

  const handleSortChange = (event) => { // 정렬 기능
    setSortedOption(event.target.value);
  };

  const handleSearchChange = (event) => { // 검색 기능
    setSearchInput(event.target.value);
  }

  return (
    <>
      {/* <span className="inp-box">
        <input type="text" value={searchInput} onChange={handleSearchChange} placeholder="검색어를 입력하세요." />
      </span> */}
      <div className="movie-site">
        <Search sortedOption={sortedOption} handleSortChange={handleSortChange} searchInput={searchInput} handleSearchChange={handleSearchChange} />
        <div className="movie-box">
          {
            loading ? 'loading...' :
            filterDataStatus ? data.slice(0, page * PER_PAGE).map((item, index) => {
              return (
                <Movie key={index} item={item} />
              )
            })
            :
            filterData.slice(0, page * PER_PAGE).map((item, index) => {
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