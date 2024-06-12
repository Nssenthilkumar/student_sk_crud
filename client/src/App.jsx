import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import './App.css'

function App() {
const [users, setUsers]=useState([]);
const [filterUsers,setFilterusers]=useState([]);

const [isModalOpen, setIsModalOpen]=useState(false);

const [userData,setUserData]=useState({name:"", lname:"", location:"", email:"", dob:"", education:"",about:""});

const getAllusers=async() => {
  await axios.get("http://localhost:8000/users").then
  ((res) =>{
    //console.log(res.data);
    setUsers(res.data);
    setFilterusers(res.data);
  });
};

useEffect(() => {
  getAllusers();
}, []);

// search function
const handleSearchChange=(e)=>{
  const searchText=e.target.value.toLowerCase();
  const filteredUsers=users.filter((user)=>user.name.toLowerCase().includes(searchText) || user.education.toLowerCase().includes(searchText)|| user.location.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText));
  setFilterusers(filteredUsers);
};

//delete function
const handleDelete = async(id) => {
  const isConfirmed=window.confirm("Are you sure you want to Delete?");{
await axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
  setUsers(res.data);
    setFilterusers(res.data);
});
}
};

//Add user Details
const handleAddRecord=() =>{
setUserData ({name:"", lname:"", location:"", email:"", dob:"", education:"",about:""});
 setIsModalOpen(true);
};

const closeModal = () =>{
  setIsModalOpen(false);
  getAllusers();
}

const handleData=(e)=>{
setUserData({...userData,[e.target.name]:e.target.value});
};

const handleSubmit = async(e) =>{
  e.preventDefault();
  if(userData.id){
    await axios.patch(`http://localhost:8000/users/${userData.id}`,
      userData).then((res)=>{
      console.log(res);
    });
  }
  else {
  await axios.post("http://localhost:8000/users",
    userData).then((res)=>{
    console.log(res);
  });
}
closeModal();
setUserData ({name:"", lname:"", location:"", email:"", dob:"", education:"",about:""});
};

// Student update record
const handleUpdateRecord=(user)=>{
setUserData(user);
setIsModalOpen(true);
}
  return (
    <>
      <div className='container'>
        <h2>Student Management System</h2>

        <div className='input-search'>
        <CiSearch className="search-icon" height={"50px"}/>
          <input type="search" name="" id="" placeholder="Search Text Here" className="search-inp" onChange={handleSearchChange}/>
          
          <button className='btn black' onClick={handleAddRecord}>Add</button>
        </div>

        <table className='table'>
          <thead>
            <tr>
           <th>ID</th>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Location</th>
           <th>Email</th>
           <th>DOB</th>
           <th>Education</th>
           <th>Action</th>
           <th>Delete</th>
           </tr>
          </thead>

          <tbody>
          {filterUsers &&
          filterUsers.map((user, index) => {
          return (
            <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.lname}</td>
            <td>{user.location}</td>
            <td>{user.email}</td>
            <td>{user.dob}</td>
            <td>{user.education}</td>
              <td className="b1"><span> <FaUserEdit size={20} color="grey" height={"20px"}/>  </span>&nbsp;&nbsp;<button className="edit" onClick={()=> handleUpdateRecord(user)} >Edit</button> </td>
              
              <td className="b1"> <span><RiDeleteBinLine size={20} color="grey" height={"20px"}/></span>&nbsp;&nbsp;<button className="del" onClick={()=> handleDelete(user.id)}>Delete</button> </td>
            </tr>
          );
        })}
        
          </tbody>
        </table>
       
      { isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&larr;</span>
            <h3 id="stud"></h3>
            <div className="input-group">
              <label htmlFor="firstname">First Name: </label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="name" id="fname" value={userData.name} placeholder="Enter First Name" onChange={handleData}/>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label htmlFor="lastname">Last Name: </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="lname" id="lname" value={userData.lname} placeholder="Enter Last Name" onChange={handleData}/>
            </div>

            <div className="input-group">
              <label htmlFor="location">Location: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="location" id="location" value={userData.location} placeholder="Enter Location" onChange={handleData}/>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email: </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="email" name="email" id="email" value={userData.email} placeholder="Enter Email" onChange={handleData}/>
            </div>

            <div className="input-group">
              <label htmlFor="dob">DOB: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="dob" id="dob" value={userData.dob} placeholder="DD MM YY" onChange={handleData}/>
            </div>
            
            <div className="input-group">
              <label htmlFor="education">Education: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="education" id="education" value={userData.education} placeholder="Enter Education" onChange={handleData}/>
            </div>

            <div className="input-group">
            <label htmlFor="about">About: </label><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea name="about" id="about" cols="30" rows="8" placeholder="Enter Something" value={userData.about} onChange={handleData}></textarea>
              
            </div>

            <button onClick={handleSubmit} className="btn green">Submit</button>


          </div>
        </div>
       )} 
        
      </div>
    </>
  );
}

export default App
