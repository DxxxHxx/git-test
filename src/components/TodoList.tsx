import Input from "./Input";
import List from "./List";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { Link } from "react-router-dom";

export default function TodoList() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="flex flex-col items-center p-3 border-2 gap-y-5">
      <h1 className="sm:text-base md:text-3xl">게시판</h1>
      <Link to={`login`}><button>로그인</button></Link>
      <Input />
      <List posts={posts!} />
    </div>
  );
}
