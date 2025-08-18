const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.get('/', wishlistController.getList);
router.post('/toggle', wishlistController.toggleWishlist);
router.post('/add/all', wishlistController.addAll);
router.post('/:productId', wishlistController.add);
router.delete('/remove/all', wishlistController.removeAll);
router.delete('/:productId', wishlistController.remove);

module.exports = router;
