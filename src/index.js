import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/db';
import usersRoutes from './routes/usersRoutes';
import connectDB from './database/db';
import petsRoutes from './routes/petsRoutes';
import planesRoutes from './routes/planesRoutes';
import servicesRoutes from './routes/servicesRoutes';
import productsRoutes from './routes/productsRoutes';
import commentsRoutes from './routes/commentsRoutes';
import aboutUsRoutes from './routes/aboutUsRoutes';
import veterinariansRoutes from './routes/veterinariansRoutes';
import turnosRoutes from './routes/turnosRoutes';

const app = express(); //para ver el servidor
app.use(express.json()); //para que todo lo que entre sea convetido a json
app.use(express.urlencoded({extended:true})) //apara aceptar pedidos urlencoded (en gral son raw)

dotenv.config(); //para acceder al .env
connectDB(); //para conectar con la base de datos
console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
console.log(new Date()); //muestra la fecha y hora en cada peticion 

app.set('PORT', process.env.PORT); //para ver el puerto
app.use(morgan('dev')); //para ver por consola
app.use(cors()); //para que todos puedan hacer peticiones

app.listen(app.get('PORT'), () => { //para ver el puerto
  console.log(`Conectado al puerto ${app.get('PORT')}`);
});

app.use('/users', usersRoutes); //para que el servidor use la ruta
app.use('/pets', petsRoutes ); //para que el servidor use la ruta
app.use('/planes', planesRoutes)
app.use('/services', servicesRoutes)
app.use('/products', productsRoutes)
app.use('/comments', commentsRoutes)
app.use('/about-us', aboutUsRoutes)
app.use('/veterinarians', veterinariansRoutes)
app.use('/turnos', turnosRoutes)
