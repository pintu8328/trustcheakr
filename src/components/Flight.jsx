import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Flight = () => {
  const [flightdata, setFlightdata] = useState([]);
  const [book, setBook] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => setFlightdata(res.data));
  }, []);

  const bookFun = () => {
    setBook(!book);
  };

  const filterProducts = (filterType) => {
    switch (filterType) {
      case "price_lToh":
        sortByPrice("price_lToh");
        break;
      case "price_hTol":
        sortByPrice("price_hTol");
        break;

      case "aToz":
        sortByTitle("aToz");
        break;
      case "zToa":
        sortByTitle("zToa");
        break;
      default:
        break;
    }
  };

  const sortByPrice = (priceSortType) => {
    let newflightdata = [];
    if (priceSortType === "price_lToh") {
      // sort asc
      newflightdata = flightdata.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
    } else {
      // sort desc
      newflightdata = flightdata.sort(function (a, b) {
        return Number(b.price) - Number(a.price);
      });
    }
    setFlightdata([...newflightdata]);
  };

  const sortByTitle = (titleSortType) => {
    let newflightdata = [];
    if (titleSortType === "aToz") {
      // sort asc
      newflightdata = flightdata.sort((a, b) =>
        a.originCity > b.originCity ? 1 : -1
      );
    } else {
      // sort desc
      newflightdata = flightdata.sort((a, b) =>
        b.originCity > a.originCity ? 1 : -1
      );
    }
    setFlightdata([...newflightdata]);
  };
  console.log("data", flightdata);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/posts/${id}`);
    var newflightdata = flightdata.filter((item) => {
      // console.log(item);
      return item.id !== id;
    });
    setFlightdata(newflightdata);
  };
  return (
    <div>
      <div>
        <label>Sort: </label>
        <select onChange={(e) => filterProducts(e.target.value)}>
          <option value="feature">Fetured</option>
          <option value="price_lToh">Price: low to high</option>
          <option value="price_hTol">Price: high to low</option>

          <option value="aToz">A-Z</option>
          <option value="zToa">Z-A</option>
        </select>
      </div>

      <div className="box">
        {flightdata.map(
          ({
            id,
            name,
            price,
            originCity,
            destinationCity,
            departureDate,
            departureTime,
          }) => {
            return (
              <div key={id}>
                <div>
                  <h3>price: {price}</h3>
                </div>
                <div>
                  <h4> Flight : {name}</h4>
                </div>
                <div className="detailDiv">
                  <div className='departDiv'>
                    <div>
                      Departed from <h3>{originCity}</h3>
                    </div>
                    <div>
                      Arrived at <h3>{destinationCity}</h3>
                    </div>
                  </div>

                  <div>
                    <div>departure detail:</div>
                    <div>
                      Date:<h3>{destinationCity}</h3>
                    </div>
                    <div>
                      Time:<h3>{departureTime}</h3>
                    </div>
                  </div>
                </div>
                <button className="btns">book</button>
                <button className="btns2">
                  {" "}
                  <Link to={`/${id}`}>view</Link>{" "}
                </button>
                <button className="btns3">
                  {" "}
                  <Link to={`/edit/${id}`}>Edit</Link>{" "}
                </button>
                <button className="btns4" onClick={() => handleDelete(id)}>
                  delete
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Flight;
