import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Navbar() {
  const [cookies, setCookies] = useCookies();

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="bg-black p-5 space-x-7 text-white text-xl font-bold">
      <Link className="px-2 py-4 rounded hover:bg-slate-700" to={"/"}>
        Home
      </Link>
      <Link
        className="px-2 py-4 rounded hover:bg-slate-700"
        to={"/create-recipe"}
      >
        Create Recipe
      </Link>

      {!cookies.access_token ? (
        <Link className="px-2 py-4 rounded hover:bg-slate-700" to={"/auth"}>
          Login/Register
        </Link>
      ) : (
        <>
          <Link
            className="px-2 py-4 rounded hover:bg-slate-700"
            to={"/saved-recipes"}
          >
            Saved Recipe
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 rounded px-4 py-2"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
