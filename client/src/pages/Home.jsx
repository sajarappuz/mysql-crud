import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Home = () => {
    
    const [books,setBooks] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () =>{
            try{
             const response = await axios.get("http://localhost:5000/books")
             setBooks(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (id) =>{
        try{
           await axios.delete("http://localhost:5000/books/"+id)
           window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Book Shop</h1>
        <div>
            {books.map((book) =>(
                <div key={book.id}>
                { book.cover && <img src={book.cover} alt="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
                <button onClick={()=>handleDelete(book.id)}>Delete</button>
                <button>  <Link to={`/update/${book.id}`}>Update</Link>  </button>
                </div>
            ))}
        </div>
        <button>
            <Link to="/add">Add New Book</Link>
            </button>
    </div>
  )
}

export default Home