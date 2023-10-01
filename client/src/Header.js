import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      window.location.reload();
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src="/images/the-folks-official.png" alt="logo" className="w-full h-10" />
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create" className="text-black font-bold mr-4">
                <i className="fas fa-edit"></i> Create Post
              </Link>
              <span className="text-black font-bold">Hey, {username}✌️</span>
              <a onClick={logout} className="text-black font-bold ml-4 cursor-pointer">
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" className="text-black font-bold mr-4">
                Login
              </Link>
              <Link to="/register" className="text-black font-bold">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
