import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function GetUserInfo() {
  const token = useOutletContext();
  const handleGetUser = () => {
    axios
      .get(`https://dummyjson.com/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data));
  };
  return (
    <button
      onClick={handleGetUser}
      className="mt-3 rounded-lg btn btn-active btn-primary"
    >
      Get user
    </button>
  );
}
