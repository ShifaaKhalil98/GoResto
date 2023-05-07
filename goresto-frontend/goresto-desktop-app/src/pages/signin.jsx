import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import NavBar from "../components/navBar";
import Input from "../components/input";
// import gopro from "../images/GoPro.png";
import styles from "../css/register.module.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!email || !password) {
      setError("All fields are required");
      isValid = false;
    }
    return isValid;
  };

  const handleInputChange = (event) => {
    setError(event.target.value);
    if (validateForm) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = { email, password };
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/login/manager`,
          data
        );
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("token", response.data.authorisation.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("menuItems", response.data.menuItems);
        localStorage.setItem("restaurant", response.data.restaurant);

        await new Promise((resolve) => setTimeout(resolve, 0));
        if (response.data.restaurant == null) navigate("/setup");
        else if (response.data.menuItems < 10) navigate("/menu");
        else if (response.data.restaurant.approved === 0) navigate("/pending");
        else navigate("/dashboard");
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === "failure" &&
          error.response.data.message === "no access"
        )
          submitAdmin();
        else setError("Email/Password is wrong");
      }
    }
  };

  const submitAdmin = () => {
    const data = { email, password };
    axios
      .post(`http://127.0.0.1:8000/api/login/admin`, data)
      .then((response) => {
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("token", response.data.authorisation.token);
        localStorage.setItem("role", response.data.user.role);
        navigate("/requests");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === "failure" &&
          error.response.data.message === "no access"
        )
          setError("If you are a customer, download our mobile app");
        else setError("Email/Password is wrong");
      });
  };

  return (
    <div className={`flex-column ${styles.registerContainer}`}>
      <NavBar />
      <div className={`flex-row ${styles.bodyContainer}`}>
        <img src={polygon1} className="polygon1" />
        <div className={`flex-column ${styles.form}`}>
          <div className={styles.heading}>
            <p className="giantsize bold">Sign in</p>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            type="email"
            label="Email"
            value={email}
            placeholder="example@domain.com"
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="********"
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange(e);
            }}
          />
          <MyButton
            className={styles.formButton}
            label="Sign in"
            onClick={(event) => handleSubmit(event)}
          />
          <div className={`flex-row ${styles.buttons}`}>
            <span>Don't have an account?</span>
            <Link to="/register" className={styles.formLink}>
              Register instead
            </Link>
          </div>
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Signin;
