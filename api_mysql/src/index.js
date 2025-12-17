const express = require('express');
const app = express();

// Settings
app.set('puerto', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./rutas/empleadoRuta'));

// Starting the server
app.listen(app.get('puerto'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('puerto')}`);
});
