import dotenv from 'dotenv'
import colors from 'colors'
import dbConnect from './src/config/db.js';
import app from './app.js';

dotenv.config({path: "./src/config/.env"});

app.listen(process.env.PORT, async() =>{
    console.log(`Server is  running on http://localhost:${process.env.PORT}`.bgMagenta);
    await dbConnect();
})