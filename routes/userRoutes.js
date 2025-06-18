const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.email}. This is a protected route.` });
});

module.exports = router;
