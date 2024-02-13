import { useState } from "react";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import Post from "./Post";
import CreatePost from "./CreatePost";

export default function Prac() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);
  return (
    <div>
      <div className="flex mb-10 gap-x-3">
        <button
          className="p-1 border-2 rounded-md bg-slate-500"
          onClick={() => setCurrentPage(<PostList1 />)}
        >
          postlist1
        </button>
        <button
          className="p-1 border-2 rounded-md bg-slate-500"
          onClick={() => setCurrentPage(<PostList2 />)}
        >
          postlist2
        </button>
        <button
          className="p-1 border-2 rounded-md bg-slate-500"
          onClick={() => setCurrentPage(<Post id={"1707043439307"} />)}
        >
          First Post
        </button>
        <button
          className="p-1 border-2 rounded-md bg-slate-500"
          onClick={() => setCurrentPage(<CreatePost />)}
        >
          new post
        </button>
      </div>

      <hr />
      {currentPage}
    </div>
  );
}
