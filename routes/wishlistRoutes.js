const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.get('/', wishlistController.getList);
router.post('/toggle', wishlistController.toggleWishlist);
router.post('/:productId', wishlistController.add);
router.delete('/:productId', wishlistController.remove);
router.delete('/remove/all', wishlistController.removeAll);

module.exports = router;
