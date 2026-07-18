//  -- Rutas veterinario --   //

const { Router, query } = require('express');
const router = Router();

const vetController = require('../controllers/vet.controller');
const userController = require('../controllers/user.controller');

const petController = require('../controllers/pet.controller');

const serviceController = require('../controllers/service.controller');
const auditController = require('../controllers/audit.controller');
const pqrsController = require('../controllers/pqrs.controller');
const historyController = require('../controllers/history.controller');


//  Vet homepage
router.get('/', vetController.homePageRender);



//  --- Usuarios ---  //


//  User list
router.get('/userList', userController.getUsers);


//  Create user
router.get('/createUser', userController.createUserRender);

router.post('/createUser', userController.createUser);


//  Update user
router.get('/userList/updateUser/:dni', userController.updateUserByDniRender);

router.post('/userList/updateUser/:dni', userController.updateUserByDni);


//  Delete user
router.get('/userList/deleteUser/:dni', userController.deleteUserByDni);


//  User profile
router.get('/userList/userProfile/:dni', userController.getUsersData);



//  --- Mascotas ---  //


//  Pet list
router.get('/petList', petController.getPets);


//  Pet profile
router.get('/petList/petProfile/:id_mascota', petController.getPetData);


//  Create pet
router.get('/createPet', petController.createPetRender);

router.post('/createPet', petController.createPet);


//  Update pet
router.get('/petList/updatePet/:id_mascota', petController.updatePetRender);

router.post('/petList/updatePet/:id_mascota', petController.updatePet);


//  Delete pet
router.get('/petList/deletePet/:id_mascota', petController.deletePetById);



//  --- Historiales ---  //


//  History list
router.get('/petList/historyList/:id_mascota', historyController.getHistory);


//  History data
router.get('/petList/historyList/:id_mascota/history/:id_hist_medico', historyController.getHistoryData);


//  Create history
router.get('/petList/historyList/:id_mascota/createHistory', historyController.createHistoryRender);

router.post('/petList/historyList/:id_mascota/createHistory', historyController.createHistory);



//  -- Mascotas por usuario --  //


//  Pet list by users
router.get('/userList/petList/:dni', petController.getPetsByDni);



//  -- Historiales por mascota --   //


//  History list by pet
router.get('/userList/petList/:dni/historyList/:id_mascota', historyController.getHistory);



//  -- Servicios -- //


//  Services list
router.get('/servicesList', serviceController.getServices);


//  Create service
router.get('/servicesList/createService', (req, res) => {
    res.render('admin/form_reg_servicio', {layout: 'internal_template'})
});

router.post('/servicesList/createService', serviceController.createService);


//  Update service
router.get('/servicesList/updateService/:id_servicio', serviceController.updateServiceRender);

router.post('/servicesList/updateService/:id_servicio', serviceController.updateService);


//  Delete service
router.get('/servicesList/deleteService/:id_servicio', serviceController.deleteServiceById);



//  -- PQRS --  //


//  PQRS list
router.get('/pqrs', pqrsController.getPQRS);


//  PQRS view
router.get('/pqrs/:id_pqrs_usr', pqrsController.getPQRSData);



//  -- Auditoria -- //


//  Audit list
router.get('/audit', auditController.getAudits);



module.exports = router;