import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { token } = (
        await axios.post(`https://reqres.in/api/login/`, { ...data })
      ).data;
      setToken(token);
      navigate("/user-list");
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-y-3"
    >
      <input
        className="p-1 border-2 rounded-lg"
        {...register("email")}
        placeholder="email"
        defaultValue={"eve.holt@reqres.in"}
      />
      {errors?.email && <p>{errors.email.message}</p>}

      <input
        className="p-1 border-2 rounded-lg"
        {...register("password")}
        placeholder="password"
        defaultValue={"cityslicka"}
      />

      <button>Log in</button>
    </form>
  );
}
