import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/db';
import usersRoutes from './routes/usersRoutes';
import connectDB from './database/db';
import petsRoutes from './routes/petsRoutes';

const app = express(); //para ver el servidor
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config(); //para acceder al .env
connectDB(); //para conectar con la base de datos
console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

//quiero que cada vez que se cargue la aplicación me muestre la hora por consola

console.log(new Date());


app.set('PORT', process.env.PORT); //para ver el puerto
app.use(morgan('dev')); //para ver por consola
app.use(cors()); //para que todos puedan hacer peticiones
app.use(express.json()); //para que todo lo que entre sea convetido a json
// app.use(express.urlencoded({extended:true})) //apara aceptar pedidos urlencoded (en gral son raw)

app.listen(app.get('PORT'), () => { //para ver el puerto
  console.log(`Conectado al puerto ${app.get('PORT')}`);
});


app.use('/users', usersRoutes); //para que el servidor use la ruta
app.use('/pets', petsRoutes ); //para que el servidor use la ruta

// app.use('/api/pets', petRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/about-us', aboutRoutes);


// router.use('/api/auth', authRoutes);
// router.use('/api/services', serviceRoutes);
// router.use('/api/contact', contactRoutes);
// router.use('/api/health-plans', healthPlanRoutes);
