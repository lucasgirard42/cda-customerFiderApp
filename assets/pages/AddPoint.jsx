import React, { useState, useEffect } from "react";
import fidelityPointsAPi from "../services/fidelityPointsAPi";
import FidelityPoint from "./FidelityPointPage";

const AddPoint = ({ match }) => {
  const { id = "new" } = match.params;
  // const [fidelityPoints, setFidelityPoints] = useState([]);
  const [fidelityPoint, setFidelityPoint] = useState([]);

  const [count, setCount] = useState(0);

  // const handleIncrement = () => setCount(count+1 );

  const handleIncrement = () => {
    setFidelityPoint({
      ...fidelityPoint,
      pointFidelityCustomer: fidelityPoint.pointFidelityCustomer + (fidelityPoint.pointFidelityCustomer < 11 ? 1:0 )   // <------ a revoir
    });
  };

  // const fetchFidelityPoints = async () => {
  //   try {
  //     const data = await fidelityPointsAPi.findAll();
  //     // console.log(data);
  //     setFidelityPoints(data);
  //     // setCount(data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  async function fetchFidelityPoint(id) {
    try {
      const data = await fidelityPointsAPi.find(id);
      const { pointFidelityCustomer, customer } = data;
      console.log(data);
      setFidelityPoint({ pointFidelityCustomer, customer: customer.id });
    } catch (error) {
      console.log(error.response);
    }
  }

  // useEffect(() => {
  //   fetchFidelityPoints();
  // }, []);

  useEffect(() => {
    fetchFidelityPoint(id);
  }, [id]);

  //   console.log(fidelityPoints);
  //   console.log(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await fidelityPointsAPi.update(id, fidelityPoint);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <h1>add point</h1>
      <table className="table ">
        <thead>
          <tr>
            <th>client</th>
            <th>point</th>
            <th>test</th>
            <th>button</th>
          </tr>
        </thead>
        <tbody>
          {/* {fidelityPoint.map((point)=>(
          <tr key={point.id}>
            <td>{point.customer.email}</td>
            <td>{point.pointFidelityCustomer} points</td>
            <td>{count} points</td>

            <td>
              <button className="btn btn-sm btn-success " onClick={handleIncrement}>+1</button>
            </td>
          </tr>
            ))} */}
          <tr>
            <td>{fidelityPoint.customer}</td>
            <td>{fidelityPoint.pointFidelityCustomer}</td>
            <td>{count}</td>
            <td>
              <button
                className="btn btn-sm btn-success"
                onClick={handleIncrement}
              >
                +1
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p>{fidelityPoint.customer}</p>
          <p>{fidelityPoint.pointFidelityCustomer}</p>
          <button
                className="btn btn-sm btn-success"
                onClick={handleIncrement}
                type="submit"
              >
                +1
              </button>
        </div>
      </form>
    </>
  );
};

export default AddPoint;
