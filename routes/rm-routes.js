const { Router } = require('express');
const { getAllRM, getRMById, addRM, updateRM, deleteRM } = require('../controllers/rm-controller');


const RMRoutes = Router();


RMRoutes.get('/getAll', getAllRM)
RMRoutes.get('/get/:id', getRMById)
RMRoutes.post('/add', addRM)
RMRoutes.put('/update/:id', updateRM)
RMRoutes.delete('/delete/:id', deleteRM)

module.exports = RMRoutes;
