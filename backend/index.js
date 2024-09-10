const express=require('express');
const cors=require('cors');
const app=express();
const mainrouter=require('./routes/index')
app.use(express.json());
app.use(cors());
app.use("/api/v1",mainrouter);
const Port=3000;
app.listen(Port,function(err){
    if(err) console.log("error in server setting");
    console.log(`Server is listening on ${Port}`);
})