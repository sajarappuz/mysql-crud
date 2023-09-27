import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
   
    const [book,setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2]


    const handleChange = (e) =>{
        setBook(prev =>({...prev, [e.target.name]: e.target.value}));
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          await axios.put("http://localhost:5000/books/"+bookId, book)
          navigate("/");
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Update the Book</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='title' name="title" onChange={handleChange}/>
        <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
        <input type="number" placeholder='price' name='price' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>
        
        <button>Update</button>
</form>
    </div>
  )
}

export default Update