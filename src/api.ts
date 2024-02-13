import axios from "axios";

export interface IPost {
  id: string;
  content: string;
  author: number;
  title: string;
}

export const getPosts = async (): Promise<IPost[]> => {
  return (
    await axios.get(`http://localhost:3001/posts`, {
      params: { _sort: "title" },
    })
  ).data;
};

export const getDetail = async (id: string) => {
  return (await axios.get(`http://localhost:3001/posts?id=${id}`)).data[0];
};

export const updateDetail = async (id: string, payload: Partial<IPost>) => {
  return (await axios.patch(`http://localhost:3001/posts/${id}`, payload))
    .data[0];
};

export const createPosts = async (payload: IPost) => {
  const res = await axios.post(`http://localhost:3001/posts`, payload);
  // console.log(res);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await axios.delete(`http://localhost:3001/posts/${id}`);
  // console.log(res);
  return res.data;
};

///////////////////////////////////////////////////////////////////

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export const getData = async () => {
  return (await axios.get(`https://jsonplaceholder.typicode.com/posts`)).data;
};

export const getPaginatedPost = async (page: number) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    .then((res) => {
      console.log();
      return {
        totalLength: parseInt(res.headers["x-total-count"]),
        posts: res.data,
      };
    });
};

export function getPostsPaginated(page: number) {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then((res) => {
      console.log(res);
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      };
    });
}

// 85fd5e4671574a9e888fa2e57165485f

export const getPaginatedNews = async (page: number, pagesize: number) => {
  return await axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=kr&apiKey=85fd5e4671574a9e888fa2e57165485f&page=${page}&pagesize=${pagesize}`
    )
    .then((res) => res.data);
};

export const getProducts = async (limit: number = 100) => {
  return (
    await axios.get(`https://dummyjson.com/products`, {
      params: { limit },
    })
  ).data.products;
};

export const AddProducts = async (payload: { id: number; title: string }) => {
  const res = await axios
    .post(`https://dummyjson.com/products/add`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);
  console.log(res);
  return res;
};

export const deleteProduct = async (id: number) => {
  const res = (await axios.delete(`https://dummyjson.com/products/${id}`)).data;
  console.log(res);
  return res;
};

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  const res= await axios
    .post(`https://dummyjson.com/auth/login`, payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);
    // console.log(res)
    return res
};

export const getuser = async (token: string) => {
  const res = await axios
    .get(`https://dummyjson.com/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  // console.log(res);
  return res;
};
