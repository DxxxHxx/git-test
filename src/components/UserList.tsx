import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface Root {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Daum[];
  support: {
    url: string;
    text: string;
  };
}

export interface Daum {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export default function UserList() {
  const [page, setPage] = useState(1);

  const getList = async (page: number) => {
    return (await axios.get(`https://reqres.in/api/login/?page=${page}`, {}))
      .data;
  };
  const { data, isLoading, isPending } = useQuery<Root>({
    queryKey: ["user-list", page],
    queryFn: () => getList(page),
    placeholderData: keepPreviousData,
  });

  const handlePrev = () => {
    setPage((prev) => (prev === 1 ? 1 : (prev -= 1)));
  };
  const handleNext = () => {
    setPage((prev) =>
      prev === data?.total_pages ? data.total_pages : (prev += 1)
    );
  };
  //   console.log(isPlaceholderData);
 
  if (isLoading || isPending) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <h1 className="mb-5 text-3xl">user-List</h1>
      <ul className="flex flex-col border-2 gap-y-2">
        {data!.data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <span>current Data : {page}</span>
      <div className="flex gap-x-3">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="p-1 border-2 rounded-lg"
        >
          prev
        </button>
        <button
          disabled={page === data?.total_pages}
          onClick={handleNext}
          className="p-1 border-2 rounded-lg"
        >
          next
        </button>
      </div>
    </div>
  );
}
