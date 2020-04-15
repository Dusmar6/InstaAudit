const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
    
};

const upload = multer({storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5//accepts 5MB
    },
    fileFilter
});//store all files in this location

router.get('/', ProductsController.products_get_all);
//TODO get images stored
//router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);
router.post('/', checkAuth, ProductsController.products_create_product);

router.get('/:productId', checkAuth, ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;