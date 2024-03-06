import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../adduser/add.css";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    //console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/v1/update/${id}`, user)
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
      <h3>Update User</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={user.fname}
            id="fname"
            onChange={inputChangeHandler}
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            value={user.lname}
            id="lname"
            onChange={inputChangeHandler}
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            id="email"
            onChange={inputChangeHandler}
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
