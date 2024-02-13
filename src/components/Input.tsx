import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { useState } from "react";
import { createPosts } from "../api";

export default function Input() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setContent("");
      setTitle("");
    },
    onError: (e) => console.log(e),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          author: Date.now(),
          id: String(Date.now()),
          title,
          content,
        });
      }}
      className="flex flex-col w-full p-2 mb-3 border-2 rounded-lg gap-y-2"
    >
      <input
        onChange={(e) => setTitle(e.currentTarget.value)}
        value={title}
        type="text"
        placeholder="title"
        className="w-full p-2 border-2 rounded-lg outline-none"
      />
      <textarea
        placeholder="content"
        className="p-2 border-2 rounded-lg resize-none"
        cols={100}
        rows={5}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      ></textarea>
      <button className="p-1 border-2 rounded-md">
        {isPending ? "posting..." : "post"}
      </button>
    </form>
  );
}
