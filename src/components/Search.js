function Search({ sortedOption, handleSortChange }) {
  return (
    <div className="search-box">
      <span className="inp-box">
        <input type="text" />
        <button type="button" className="btn find-btn">찾기</button>
      </span>
      <span className="sel-box">
        <select onChange={handleSortChange} value={sortedOption}>
          <option value="a">가나다순</option>
          <option value="b">가나다역순</option>
          <option value="c">평점 높은순</option>
          <option value="d">평점 낮은순</option>
          <option value="e">평가 참여 높은순</option>
          <option value="f">평가 참여 낮은순</option>
          <option value="g">인기 높은순</option>
          <option value="h">인기 낮은순</option>
        </select>
      </span>
    </div>
  )
}

export default Search;