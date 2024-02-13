import { Link } from "react-router-dom";
import { IPost } from "../api";
import { useState } from "react";

export default function List({ posts }: { posts: IPost[] }) {
  const [page, setPage] = useState(1);
  const pageSize = 1;
  const pageLen = Math.ceil(posts.length / pageSize);

  // console.log(pageLen)
  const lastPostIndex = page * pageSize;
  const firstPostIndex = lastPostIndex - pageSize;
  const paginatedPosts = posts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full ">
      <div className="grid grid-cols-9 mb-3 border-2 rounded-lg">
        <span className="pl-1">No</span>
        <span>제목</span>
        <span className="col-start-9">작성 기간</span>
      </div>
      <ul>
        {paginatedPosts.map((post, index) => (
          <ListItem key={post.id} {...post} index={index + 1} />
        ))}
      </ul>

      <div className="flex justify-center gap-x-5">
        {new Array(pageLen).fill(null).map((_, index) => (
          <button
            className={`${
              index + 1 === page ? "bg-slate-500" : "bg-red-300"
            } px-3 py-1 rounded-lg`}
            onClick={() => setPage(index + 1)}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

interface IListItem extends IPost {
  index: number;
}
export const ListItem = (props: IListItem) => {
  return (
    <li className="p-3 mb-3 border-2 rounded-lg">
      <Link to={`/post-detail/${props.id}`}>
        <div className="flex items-center justify-between ">
          <div>
            <span className="mr-20">{props.index}</span>
            {props.title}-by {props.author}
          </div>
          <span>{new Date(Number(props.id)).toLocaleTimeString()}</span>
        </div>
      </Link>
    </li>
  );
};
