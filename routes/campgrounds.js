const express = require('express')
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer = require('multer')
const {storage} = require('../cloudinary')
//const upload = multer({dest: 'uploads/'})
const upload = multer({ storage })

//const Campground = require('../models/campground')

router.get('/', catchAsync(campgrounds.index))

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCamp))

/* router.post('/', upload.single('image'), (req, res) =>{
    res.send(req.body, req.file)
})
 */
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.get('/:id', catchAsync(campgrounds.getCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm), )
                                            
router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router