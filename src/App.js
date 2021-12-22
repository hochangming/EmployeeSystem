import './App.css';
import {useState} from "react";
import Axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const displayInfo = () => {
    console.log(name + age + country + position + wage)
  }
  const [newWage, setNewWage] = useState(0);
  const addEmployee = () =>{
    Axios.post("https://mysqldeployment.herokuapp.com/create", 
    { name: name, 
      age: age, 
      country: country, 
      position: position,
      wage: wage }).then(()=> //promise
      {setEmployeeList([...employeeList, {
        name: name, 
        age: age, 
        country: country, 
        position: position,
        wage: wage
      }])});
  }; //send to backend

  const getEmployees = () => {
    Axios.get("https://mysqldeployment.herokuapp.com/employees").then((response)=>{
      setEmployeeList(response.data)
    })
  };

  const updateEmployeeWage = (id) =>{
    Axios.put("https://mysqldeployment.herokuapp.com/update",{wage: newWage, id: id}).then((response)=>{
      setEmployeeList(employeeList.map((val)=>{
        return val.id == id ? {id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage} : val
      }))
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`https://mysqldeployment.herokuapp.com/delete/${id}`).then((response)=>{
      setEmployeeList(employeeList.filter((val)=>{
        return val.id != id;
      }))
    });
  }



  return (
    <div className="App">
      <div className='information'>
      <label>Name:</label>
      <input type = "text" onChange={(event)=> {setName(event.target.value)}}/>
      <label>Age:</label>
      <input type = "number" onChange={(event)=> {setAge(event.target.value)}}/>
      <label>Wage:</label>
      <input type = "number" onChange={(event)=> {setWage(event.target.value)}}/>
      <label>Country:</label>
      <input type = "text" onChange={(event)=> {setCountry(event.target.value)}}/>
      <label>Position:</label>
      <input type = "text" onChange={(event)=> {setPosition(event.target.value)}}/> 

      <button onClick={addEmployee}>Add Employee</button>
      <button onClick={getEmployees}>Show Employees</button>
      {
        employeeList.map((val,key)=>{
          return <div className="employee">
            <div>
              <h3>Name: {val.name} </h3>
              <h3>Age: {val.age} </h3>
              <h3>Country: {val.country} </h3>
              <h3>Position: {val.position} </h3>
              <h3>Wage: {val.wage} </h3>
            </div>
            <div> 
              <input type ="text" placeholder="New Wage..."
              onChange={(event)=> {setNewWage(event.target.value)}}></input>
              <button onClick={()=>{updateEmployeeWage(val.id)}}> Update</button>
              <button onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
            </div>
          </div>
        })
      }
      </div>
    </div>
  );
}

export default App;
