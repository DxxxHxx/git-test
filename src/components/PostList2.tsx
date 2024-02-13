import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";

export default function PostList2() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <h1>Post List2</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
