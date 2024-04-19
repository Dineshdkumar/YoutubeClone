import React, { useState } from "react";
import "./Head.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Head = ({ handleToggleBar }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  return (
    <div
      className="header position-fixed top-0 w-100 zi-999"
      style={{ zIndex: 10 }}
    >
      <div className=" d-flex justify-content-between align-items-center ">
        <div>
          <FaBars className="" size={26} onClick={handleToggleBar} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" alt="" className="ytlogo " height={26} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="form-head d-flex justify-content-center align-items-center position-relative"
          action=""
        >
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "25rem", borderRadius: "0.5rem" }}
          />
          <button
            className="form-button position-absolute"
            type="submit"
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
              right: "0",
            }}
          >
            <AiOutlineSearch size={22} />
          </button>
        </form>

        <div className=" d-flex justify-content-end align-items-center">
          <MdNotifications id="" size={28} />
          <MdApps id="appsicon" size={28} />
          <img src="https://w7.pngwing.com/pngs/152/155/png-transparent-male-man-person-business-avatar-icon.png" className="avatarlogo" alt="" height={35} />
        </div>
      </div>
    </div>
  );
};

export default Head;
