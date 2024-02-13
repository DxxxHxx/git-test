import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IPost, deletePost, getDetail, updateDetail } from "../api";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<IPost>({
    queryKey: ["post", id],
    queryFn: () => getDetail(id!),
  });
  // console.log(data);
  const [update, setUpdate] = useState(false);
  const [updateContent, setUpdateContent] = useState(data?.content);
  const [updateTitle, setUpdatetitle] = useState(data?.title);
  const navigate = useNavigate();

  const { mutate: deleteFn, isPending: deleteLoading } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const { mutate: updateFn, isPending: updateLoading } = useMutation({
    mutationFn: (payload: Partial<IPost>) => updateDetail(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", id],
      });
    },
  });
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpdate((prev) => !prev);
    if (e.currentTarget.innerText === "ok") {
      //
      if (updateContent !== "" && updateTitle !== "") {
        updateFn({
          content: updateContent,
          title: updateTitle,
        });
      } else if (updateContent !== "") {
        updateFn({ content: updateContent });
      } else if (updateTitle !== "") {
        updateFn({ title: updateTitle });
      }
    }
  };
  const handleDelete = () => {
    deleteFn(id!);
    navigate("/");
  };

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="p-1 bg-red-300 rounded-lg"
      >
        back to home
      </button>
      <div className="flex flex-col p-2 my-5 border-2 gap-y-3">
        {update ? (
          <input
            value={updateTitle}
            onChange={(e) => setUpdatetitle(e.currentTarget.value)}
            className="px-1 border-2"
            type="text"
            placeholder="content"
          />
        ) : (
          <h1>title : {data?.title}</h1>
        )}
        {update ? (
          <input
            value={updateContent}
            onChange={(e) => setUpdateContent(e.currentTarget.value)}
            className="px-1 border-2"
            type="text"
            placeholder="content"
          />
        ) : (
          <h1>content: {data?.content}</h1>
        )}
      </div>

      <div className="flex gap-x-5">
        <button onClick={handleUpdate} className="p-1 bg-red-300 rounded-lg">
          {update ? "ok" : updateLoading ? "loading..." : "update"}
        </button>
        <button onClick={handleDelete} className="p-1 bg-red-300 rounded-lg">
          {deleteLoading ? "loading..." : "delete"}
        </button>
      </div>
    </div>
  );
}

/*
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IPost, deletePost, getDetail, updateDetail } from "../api";
import { useState } from "react";

export default function PostDetail() {
  const [update, setUpdate] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IPost>({
    queryKey: [`post-detail_${id}`],
    queryFn: () => getDetail(id!),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteFn } = useMutation({
    mutationFn: () => {
      return deletePost(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`post-detail_${id}`],
      });
      navigate(-1);
    },
    onError: (e) => console.log(e),
  });
  const { mutate: updateFn } = useMutation({
    mutationFn: (payload: Partial<IPost>) => updateDetail(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`post-detail_${id}`] });
    },
    onError: (e) => console.log(e),
  });
  const handleDelete = () => {
    deleteFn();
  };
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setUpdate((prev) => !prev);
    // if (e.currentTarget.innerText === "수정완료") {
    //   setUpdateData((prev) => {
    //     return {
    //       ...prev,
    //       content: updatedContent,
    //     };
    //   });
    //   updateFn();
    // }
    setUpdate((prev) => !prev);
    if (e.currentTarget.innerText === "수정완료") {
      updateFn({
        content: updatedContent,
        author: Date.now(),
        id: String(Date.now()),
      });
    }
  };
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-96 gap-y-5">
      <button onClick={() => navigate(-1)} className="absolute top-0 left-0">
        back
      </button>
      <div>
        <h1>{data?.title}</h1>

        {update ? (
          <input
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.currentTarget.value)}
            className="border-2"
          />
        ) : (
          <div>{data?.content}</div>
        )}
      </div>

      <div className="flex gap-x-3">
        <button onClick={handleUpdate} className="p-2 border-2 rounded-md">
          {update ? "수정완료" : "수정"}
        </button>
        <button onClick={handleDelete} className="p-2 border-2 rounded-md">
          삭제
        </button>
      </div>
    </div>
  );
}

*/
