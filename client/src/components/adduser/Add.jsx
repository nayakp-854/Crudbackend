import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    //console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault(); //This method prevents the default behavior of the event. In this case, it prevents the form from being submitted and the page from refreshing when the form is submitted.
    await axios
      .post("http://localhost:8000/api/v1/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"} className="backbtn">
        Back
      </Link>
      <h3>Add New User</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            onChange={inputHandler}
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            onChange={inputHandler}
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={inputHandler}
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
