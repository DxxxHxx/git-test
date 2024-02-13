import { useQuery } from "@tanstack/react-query";
import { IPost, getDetail } from "../api";

export default function Post({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery<IPost>({
    queryKey: ["posts", id],
    queryFn: () => getDetail(id),
  });

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <h1>{data?.title}</h1>

      <small>
        {isLoading
          ? "loading user..."
          : isError
          ? "loading err..."
          : data?.content}
      </small>
    </div>
  );
}
