const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Resolve string product IDs (e.g. "mocha") to real MongoDB ObjectIds
    const resolvedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const productData = await Product.findOne({ id: item.product });
        if (!productData) throw new Error(`Product not found: ${item.product}`);
        return {
          ...item,
          product: productData._id // Swap string ID for real ObjectId
        };
      })
    );

    // Create Razorpay Order
    const options = {
      amount: Math.round(totalPrice * 100), // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save initial order in MongoDB
    const order = new Order({
      user: req.user._id,
      orderItems: resolvedOrderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      paymentResult: {
        razorpay_order_id: razorpayOrder.id
      }
    });

    const createdOrder = await order.save();

    res.status(201).json({
      orderId: createdOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Find order and update to paid
      const order = await Order.findById(order_id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        };
        await order.save();
        
        // --- NEW: Empty the Cart upon successful payment ---
        const Cart = require('../models/Cart');
        const userCart = await Cart.findOne({ user: req.user._id });
        if (userCart) {
          userCart.items = [];
          await userCart.save();
        }
        // --------------------------------------------------

        res.json({ message: 'Payment verified successfully and cart emptied' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment, getMyOrders };
