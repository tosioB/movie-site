import { useParams } from "react-router-dom";

function Detail() {
  const id = useParams();
  console.log(id);

  return (
    <div>상세</div>
  )
}

export default Detail;