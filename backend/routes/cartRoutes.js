const express = require('express');
const router = express.Router();
const { getCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getCart)
  .post(protect, updateCart);

router.delete('/:productId', protect, removeFromCart);

module.exports = router;
