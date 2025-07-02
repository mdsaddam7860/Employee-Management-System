import React, { useEffect, useState } from "react";

const Header = (props) => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.role === "admin") {
          setUsername("Admin");
        } else if (parsed.role === "employee" && parsed.data?.firstName) {
          setUsername(parsed.data.firstName);
        }
      } catch (err) {
        console.error("Invalid user data:", err);
      }
    }
  }, []);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
  };

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium">
        Hello <br />
        <span className="text-3xl font-semibold">{username} 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-orange-600 text-base rounded-lg font-medium text-white px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
