const router = require('express').Router();

// Importing the User Controller
const userController = require('./../controllers/user.controller');


// Init User Routes


// @route   POST api/user/register
// @desc    Register User
// @access  Public
router.post('/signup', userController.register);

// @route   POST api/user/login
// @desc    Login User
// @access  Public
router.post('/login', userController.login);

// @route   GET api/user/me
// @desc    Get User Profile
// @access  Private
router.get('/me', userController.me);

// @route   GET api/user/logout
// @desc    Logout User
// @access  Private
router.get('/logout', userController.logout);

// @route   GET api/user/logoutAll
// @desc    Logout User from all devices
// @access  Private
router.get('/all', userController.all);

// @route GET api/user/verify/:token
// @desc Verify User
// @access Public
router.get('/verify/:token', userController.verify);


// @route PATCH api/user/forgot-password
// @desc Forgot Password
// @access Public
router.post('/forgot-password', userController.forgotPassword);
