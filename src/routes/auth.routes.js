const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth.controller');


//  SignIn
router.get('/', (req, res) => {
    res.render('auth/signIn', {layout: 'internal_template'});
});

router.post('/', authController.signIn);


//  Logout (SuperAdmin, Admin, User)
router.get('/logout', authController.logout)


module.exports = router;