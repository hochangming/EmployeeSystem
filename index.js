const express = require("express");
const app = express();
// const mysql = require("mysql2");
const cors = require("cors");
const db = require("./config/db")
app.use(cors());
app.use(express.json());
// function handleDisconnect() {
//     // connection = mysql.createConnection(con); // Recreate the connection, since
//     //                                                   // the old one cannot be reused.
    
//     db.connect(function(err) {              // The server is either down
//         if(err) {                                     // or restarting (takes a while sometimes).
//           console.log('error when connecting to db:', err);
//           setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//         }                                     // to avoid a hot loop, and to allow our node script to
//       });                                     // process asynchronous requests in the meantime.
//                                               // If you're also serving http, display a 503 error.
//       db.on('error', function(err) { 
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//           handleDisconnect();                         // lost due to either server restart, or a
//         } else {                                      // connnection idle timeout (the wait_timeout
//           throw err;                                  // server variable configures this)
//         }
//       });
//     }
    
//     handleDisconnect(); 

app.post("/create", (req,res) =>{
    // console.log(name);
    const name = req.body.name;
    console.log(name);
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
 
    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
     [name,age,country,position,wage],
     (err, result) => {
        if(err){  
            console.log(err);
        } else{ 
            res.send("Values Inserted"); 
        } 
     } 
     )   
}) 

app.get("/employees", (req,res) =>{
    db.query("SELECT * FROM employees", (err,result)=>{
        if(err)
            console.log(err);
        else    
            res.send(result);
    })
});
 

app.put('/update', (req,res)=>{
    const id = req.body.id;
    const wage = req.body.wage
    db.query("UPDATE employees SET wage = ? WHERE id = ?",[wage,id], (err,result)=>{
        if(err){
            console.log(err);
        }
        else{ 
            res.send(result);
        }
    });

})
 
app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id = ?", id, (err,result)=>{
        if(err)
            console.log(err);
        else    
            res.send(result);
    })
})

app.listen(process.env.PORT || 3001, ()=>{
    console.log("server running on port 3001")
})