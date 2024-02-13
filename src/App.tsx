import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { login } from "./api";
import { Outlet, useNavigate } from "react-router-dom";

export interface IInfo {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export default function App() {
  const [id, setId] = useState("kminchelle");
  const [pw, setPw] = useState("0lelplR");
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };
  const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.currentTarget.value);
  };

  const { mutate } = useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      login(payload),
    onSuccess: (res) => {
      settoken(res.token);
    },
    onError: (e) => console.log(e.message),
  });

  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ username: id, password: pw });
          navigate("get-user-info");
        }}
      >
        <Input text="ID" onChange={handleChangeId} value={id} />
        <Input text="PW" onChange={handleChangePw} value={pw} />
        <button className="mt-3 rounded-lg btn btn-active btn-primary">
          Log in
        </button>
      </form>

      <Outlet context={token} />
    </>
  );
}
const Input = ({
  text,
  onChange,
  value,
}: {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <label className="w-full max-w-xs form-control">
      <div className="label">
        <span className="label-text">{text}</span>
      </div>
      <input
        type="text"
        placeholder={text}
        className="w-full max-w-xs input input-bordered"
        required
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
