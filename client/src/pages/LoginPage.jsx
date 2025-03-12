import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    try {
      const queryParams = `email=${email}&password=${password}`;
      console.log(queryParams);

      const res = await fetch(
        `http://localhost:5000/user/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 1) {
        console.log(data);
        console.log(data["data"]["token"]);
        localStorage.setItem("token", data["data"]["token"]);
        localStorage.setItem("name", data["data"]["name"]);
        localStorage.setItem("email", data["data"]["email"]);
        navigation("/Home");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen flex flex-auto justify-center items-center">
      <div className="custom-bg-sidebar p-8 rounded-lg shadow-lg w-96 backdrop-blur-md flex flex-col items-center text-center">
        <h2 className="text-white text-center text-2xl font-bold mb-6">
          Login
        </h2>
        <form className="flex flex-col items-center w-full space-y-4 text-black-800">
          <input
            className="font-semibold text-black p-2 rounded w-full"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            name=""
            id=""
          />
          <input
            className="font-semibold text-black p-2 rounded w-full"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name=""
            id=""
          />
          <br />
          <button
            className="custom-bg-lightbrown hover:bg-[#d1b49b] text-black font-semibold py-2 px-10 rounded"
            type="submit"
            onClick={login}
          >
            Login
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};
export default LoginPage;
