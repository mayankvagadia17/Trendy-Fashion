import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";
import { useAuth } from "../components/context/AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handlelogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const queryParams = `email=${email}&password=${password}`;
      console.log(queryParams);

      const res = await fetch(
        `${BASE_URL}/user/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.status === 1) {
        console.log(data);
        login(data["data"]["token"]);
        localStorage.setItem("name", data["data"]["name"]);
        localStorage.setItem("email", data["data"]["email"]);
        navigation("/Home");
      } else {
        console.log(data);
        alert("Login failed");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Login failed");
    }
  }

  return (
    <div className="h-screen flex flex-auto justify-center items-center">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
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
                id="login"
              />
              <input
                className="font-semibold text-black p-2 rounded w-full"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                name=""
                id="password"
              />
              <br />
              <button
                className="custom-bg-lightbrown hover:bg-[#d1b49b] text-black font-semibold py-2 px-10 rounded"
                type="submit"
                onClick={handlelogin}
              >
                Login
              </button>
            </form>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
