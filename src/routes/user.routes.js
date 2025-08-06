const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const petController = require('../controllers/pet.controller'); 
const histController = require('../controllers/history.controller');



//  -- Cliente --   //


//  User homepage
router.get('/', userController.homePageRender);


//  User profile
router.get('/userProfile/:dni', userController.getUserData);



//  -- Mascotas --  //


//  Pet list
router.get('/petList/:dni', petController.getPetsByDni);


//  Pet profile
router.get('/petList/petProfile/:id_mascota', petController.getPetData);



//  -- Historiales --   //


//  History list
router.get('/userList/petList/:dni/historyList/:id_mascota', histController.getHistory);


//  History
router.get('/petList/historyList/:id_mascota/history/:id_hist_medico', histController.getHistoryData);



module.exports = router;