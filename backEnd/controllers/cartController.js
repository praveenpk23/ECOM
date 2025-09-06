import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";
const DELIVERY_CHARGE = 59;
const GST_PERCENTAGE = 18;

const calculateOrder = (cart) => {
  cart.itemPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  cart.shippingPrice = cart.itemPrice >= 499 ? 0 : DELIVERY_CHARGE;
  cart.taxPrice = Number(((GST_PERCENTAGE / 100) * cart.itemPrice).toFixed(2));
  cart.totalPrice = Number(
    (cart.itemPrice + cart.taxPrice + cart.shippingPrice).toFixed(2)
  );
};

// POST /api/cart/merge
// Body: { cartItem: [ { _id, quantity, price } ] }

export const mergeCartOnLogin = async (req, res) => {
  // req.body is already JSON 
  const localCart = req.body;
  console.log(localCart,localCart.cartItem, " local cart", localCart.cartItem.length);
  if (!localCart.cartItem || !localCart.cartItem.length) {
    return res.status(400).json({ message: "No local cart to merge" });
  }

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: localCart.cartItem.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    } else {
      for (const localItem of localCart.cartItem) {
        const product = await Product.findById(localItem._id);

        const existItem = cart.items.find((i) =>
          i.productId.equals(product._id)
        );

        if (existItem) {
          existItem.quantity += localItem.quantity;
          if (existItem.quantity > product.countInStock)
            existItem.quantity = product.countInStock;
        } else {
          cart.items.push({
            productId: product._id,
            quantity: Math.min(localItem.quantity, product.countInStock), // Prevent exceeding stock
            price: product.price,
          });
        } 
      }
    }

    calculateOrder(cart);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to merge cart", error: err.message });
  }
};

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId",
      // "name price"  // specify fields to return if not second argument it returns all fields
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    calculateOrder(cart); // in-memory calculation
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    console.log(cart);
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ productId, quantity, price: product.price }],
      });
    } else {
      const existItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existItem) {
        existItem.quantity += quantity;
        if (existItem.quantity > product.countInStock)
          existItem.quantity = product.countInStock;
      } else {
        cart.items.push({ productId, quantity, price: product.price });
      }
    }

    calculateOrder(cart);
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/cart/:productId
export const updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    const product = await Product.findById(productId);
    item.quantity = Math.min(quantity, product.countInStock);

    calculateOrder(cart);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    calculateOrder(cart);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
