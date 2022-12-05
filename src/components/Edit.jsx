import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [editdata, setEditdata] = useState({
    stuname: "",
    email: "",
  });
  useEffect(() => {
    async function getStudent() {
      try {
        const editdata = await axios.get(`http://localhost:8080/posts/${id}`);
        setEditdata(editdata.data);
      } catch (error) {
        console.log("Something is Wrong1");
      }
    }
    getStudent();
  }, [id]);

  function onTextFieldChange(e) {
    setEditdata({
      ...editdata,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/posts/${id}`, editdata);
      Navigate("/");
    } catch (error) {
      console.log("Something is Wrong2");
    }
  }
  function handleClick() {
    Navigate("/");
  }
  return (
    <div>
      <div>
        <label>name</label>
        <input
          type="text"
          value={editdata.name}
          autoComplete="name"
          name="name"
          id="name"
          label="Name"
          onChange={(e) => onTextFieldChange(e)}
          required
        />
      </div>
      <div>
        <label>price</label>
        <input
          type="number"
          value={editdata.price}
          autoComplete="price"
          name="price"
          id="price"
          label="price"
          onChange={(e) => onTextFieldChange(e)}
          required
        />
      </div>
      <div>
        <label>originCity</label>
        <input
          type="text"
          value={editdata.originCity}
          autoComplete="originCity"
          name="originCity"
          id="originCity"
          label="originCity"
          onChange={(e) => onTextFieldChange(e)}
          required
        />
      </div>
      <div>
        <label>destinationCity</label>
        <input
          type="text"
          value={editdata.destinationCity}
          autoComplete="destinationCity"
          name="destinationCity"
          id="destinationCity"
          label="destinationCity"
          onChange={(e) => onTextFieldChange(e)}
          required
        />
      </div>
      <div>
        <label>departureDate</label>
        <input
          type="date"
          value={editdata.departureDate}
          autoComplete="departureDate"
          name="departureDate"
          id="departureDate"
          label="departureDate"
          onChange={(e) => onTextFieldChange(e)}
          required
        />
      </div>

      <label>departureTime</label>
      <input
        type="text"
        value={editdata.departureTime}
        autoComplete="departureTime"
        name="departureTime"
        id="departureTime"
        label="departureTime"
        onChange={(e) => onTextFieldChange(e)}
        required
      />
      <button type="submit" onClick={(e) => onFormSubmit(e)}>
        submit
      </button>
    </div>
  );
};

export default Edit;
