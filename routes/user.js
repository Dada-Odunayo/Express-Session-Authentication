const express = require("express")
const userRouter = express.Router();
const {registerUser, loginUser, protected} = require("../controller/userController")
const {validateLogin,validateRegistration} = require("../middleware/validationMiddleware")
const {isAuth} = require("../middleware/auth")

userRouter.post('/register',validateRegistration,registerUser);

userRouter.post('/login',validateLogin,loginUser)

userRouter.post('/protected',isAuth,protected)
module.exports = userRouter;