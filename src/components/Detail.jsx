import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [datatab, setDatatab] = useState([]);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:8080/posts/${id}`);
        console.log(student.data);
        setDatatab(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);

  console.log("data", datatab);
  return (
    <div className="box2">
      <button onClick={handleClick} className="btns">
        Back to home
      </button>
      <div>
        <h3>price: {datatab.price}</h3>
      </div>
      <div>
        <h4> Flight : {datatab.name}</h4>
      </div>
      <div className="detailDiv">
        <div>
          <div>
            Departed from <h3>{datatab.originCity}</h3>
          </div>
          <div>
            Arrived at <h3>{datatab.destinationCity}</h3>
          </div>
        </div>

        <div>
          <div>departure detail:</div>
          <div>
            Date:<h3>{datatab.destinationCity}</h3>
          </div>
          <div>
            Time:<h3>{datatab.departureTime}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
