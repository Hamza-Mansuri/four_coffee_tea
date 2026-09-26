const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalAmount: 0 });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/Update item in cart
const updateCart = async (req, res) => {
  const { productId, quantity } = req.body; // productId is the string 'id' (e.g., 'mocha')

  try {
    // Find product ObjectId
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(p => p.product.toString() === product._id.toString());

    if (itemIndex > -1) {
      // If item exists, update quantity
      cart.items[itemIndex].quantity = quantity;
    } else {
      // If item doesn't exist, push to items array
      cart.items.push({ product: product._id, quantity });
    }

    // Optional: Calculate total amount here or let frontend do it
    await cart.save();
    
    // Return populated cart
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== product._id.toString());
      await cart.save();
    }
    
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, updateCart, removeFromCart };
