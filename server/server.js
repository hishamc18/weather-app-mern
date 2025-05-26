import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoute.js';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
connectDB()


app.use(cors());
app.use(express.json());

//routes
app.use('/weather', weatherRoutes);

//global error handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`server running on the PORT: ${PORT}`);
})

