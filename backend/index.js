import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Appuz@2708",
    database:"test"
})

app.get("/", (req,res)=>{
    res.json("hello from backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json("fetching failed")
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err,data)=>{
       if(err) return res.send(err);
       return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"
    
    db.query(q, [bookId], (err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
     });
    })

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` =?, `cover` = ? WHERE id =?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    
    db.query(q, [...values,bookId], (err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
     })

}
)


app.listen(5000, ()=>{
    console.log("server running successfully")
})