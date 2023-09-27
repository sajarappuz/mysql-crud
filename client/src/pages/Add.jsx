import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
   
    const [book,setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setBook(prev =>({...prev, [e.target.name]: e.target.value}));
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          await axios.post("http://localhost:5000/books", book)
          navigate("/");
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Add New Book</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='title' name="title" onChange={handleChange}/>
        <input type="text" placeholder='desc' name='desc' onChange={handleChange}/>
        <input type="number" placeholder='price' name='price' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>
        
        <button>Add</button>
</form>
    </div>
  )
}

export default Add