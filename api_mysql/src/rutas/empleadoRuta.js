const express = require('express');
const ruta = express.Router();

const mysqlConexion = require('../base.js');

// GET all Employees
ruta.get('/listar', (req, res) => {
  mysqlConexion.query('SELECT * FROM empleado', (error, filas, campos) => {
    if (!error) {
      res.json(filas);
    } else {
      console.log(error);
    }
  });
});

// GET An Employee
ruta.get('/buscar/:id', (req, res) => {
  const { id } = req.params;
  mysqlConexion.query('SELECT * FROM empleado WHERE id = ?', [id], (error, filas, campos) => {
    if (!error) {
      res.json(filas[0]);
    } else {
      console.log(error);
    }
  });
});

// DELETE An Employee
ruta.delete('/eliminar/:id', (req, res) => {
  const { id } = req.params;
  mysqlConexion.query('DELETE FROM empleado WHERE id = ?', [id], (error, filas, campos) => {
    if (!error) {
      res.json({ status: 'EMPLEADO ELIMINADO' });
    } else {
      console.log(error);
    }
  });
});

// INSERT An Employee
ruta.post('/insertar', (req, res) => {
  const { id, nombre, apellido, email, telefono, turno, area } = req.body;
  //console.log(id,nombre, apellido, email, telefono, turno, area);
  console.log(req.body);
  const consulta = `
  SET @id = ?;
  SET @nombre = ?;
  SET @apellido = ?;
  SET @email = ?;
    SET @telefono = ?;
    SET @turno = ?;
    SET @area = ?;
    insert into empleado(id,nombre,apellido,email,telefono,turno,area)
    values(@id , @nombre , @apellido , @email , @telefono , @turno, @area); 
  `;
  mysqlConexion.query(consulta, [id,nombre,apellido,email,telefono,turno,area], (error, filas, fields) => {
    if (!error) {
      res.json({ status: 'EMPLEADO GUARDADO' });
    } else {
      console.log(error);
    }
  });

});




ruta.put('/editar/:id', (req, res) => {
  const { nombre, apellido, email, telefono, turno, area } = req.body;
  console.log(nombre, apellido, email, telefono, turno, area);
  const { id } = req.params;
  const consulta = `
    SET @id = ?;
    SET @nombre = ?;
    SET @apellido = ?;
    SET @email = ?;
      SET @telefono = ?;
      SET @turno = ?;
      SET @area = ?;
     update empleado
     set nombre=@nombre,
     apellido=@apellido,
     email= @email,
     telefono=@telefono, 
     turno=@turno,
     area=@area 
     where id=@id;
  `;
  mysqlConexion.query(consulta, [ id,nombre,apellido,email,telefono,turno,area], (error, filas, campos) => {
    if (!error) {
      res.json({ status: 'EMPLEADO  EDITADO' });
    } else {
      console.log(error);
    }
  });
});

module.exports = ruta;
