import express from 'express'

const app = express();

app.use(express.json());


app.use('/rokib',function(req, res){
    res.send('rokib');
})


app.use('/me',(req,res) =>{
   res.send("This is me");
});

export default app;