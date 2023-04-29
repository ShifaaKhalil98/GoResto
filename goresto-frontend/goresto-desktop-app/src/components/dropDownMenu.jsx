import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDownMenu.module.css";
import axios from "axios";

const DropDownMenu = (props) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = localStorage.getItem("token");
  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignoutClick = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/signin");
      // axios
      //   .post(`http://127.0.0.1:8000/api/logout`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error({ error });
      //   });
    }
  };

  return (
    <nav className={styles.dropDownMenu}>
      <div className={styles.value} onClick={handleUserClick}>
        <span className="flex-row">
          <span>{props.value}</span>
          <span className={styles.arrow}>&#9660;</span>
        </span>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropDownItems}>
          <a>Settings</a>
          <a onClick={handleSignoutClick}>Sign out</a>
        </div>
      )}
    </nav>
  );
};

export default DropDownMenu;