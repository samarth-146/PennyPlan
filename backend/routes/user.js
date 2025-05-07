const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/userController');

userRouter.get('/alluser',userController.getAllUsers);
userRouter.get('/user/:userId',userController.getUserById);
userRouter.post('/signup',userController.signup);
userRouter.post('/login',userController.login);
userRouter.put('/onboard/:userId',userController.onboardingDetail);
userRouter.put('/roundup-setting/:userId',userController.toggleRoundup);
userRouter.put('/profile/:userId',userController.editProfile);
userRouter.post('/logout',userController.logout);



module.exports=userRouter;
