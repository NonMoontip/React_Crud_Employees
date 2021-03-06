import Axios from "axios";
import { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }
  const addEmployees = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
  }
  const UpdateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', {
      wage: newWage, id: id
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage
          } : val;
        })
      )
    })
  }
  return (
    <div className="App">
      <div className="App container">
        <h1>Employee</h1>
        <div className="information">
          <form action="">
            <div className="mb3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => {
                setName(event.target.value)
              }}
              />
            </div>
            <div className="mb3">
              <label htmlFor="age" className="form-label">Age:</label>
              <input type="number" className="form-control" placeholder="Enter age"
                onChange={(event) => {
                  setAge(event.target.value)
                }}
              />
            </div>
            <div className="mb3">
              <label htmlFor="country" className="form-label">Country:</label>
              <input type="text" className="form-control" placeholder="Enter country"
                onChange={(event) => {
                  setCountry(event.target.value)
                }}
              />
            </div>
            <div className="postion">
              <label htmlFor="name" className="form-label">Position:</label>
              <input type="text" className="form-control" placeholder="Enter position"
                onChange={(event) => {
                  setPosition(event.target.value)
                }}
              />
            </div>
            <div className="mb3">
              <label htmlFor="wage" className="form-label">Wage:</label>
              <input type="number" className="form-control" placeholder="Enter wage"
                onChange={(event) => {
                  setWage(event.target.value)
                }}
              />
            </div>
            <button className="btn btn-success" onClick={addEmployees}>Add Employee</button>
          </form>
        </div>
        <hr />

        <div className="employee">
          <button className="btn btn-primary" onClick={getEmployees}>Show Employee</button>
          <br />
          <br />
          {employeeList.map((val, key) => {
            return (
              <div className="employee card">
                <div className="card-body text-left">
                  <p className="card-text">Name: {val.name}</p>
                  <p className="card-text">Age: {val.age}</p>
                  <p className="card-text">Country: {val.country}</p>
                  <p className="card-text">Position: {val.position}</p>
                  <p className="card-text">Wage: {val.wage}</p>

                  <div className="d-flex">
                    <input
                      type="number"
                      style={{ width: "300px" }}
                      placeholder="15000..."
                      className="form-control"
                      onChange={(event) => {
                        setNewWage(event.target.value)
                      }}
                    />
                    <button className="btn btn-warning" onClick={() => { UpdateEmployeeWage(val.id) }}>Update</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
