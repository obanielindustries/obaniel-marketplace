import { Cart } from "../models/cartModel.js";

// helper to send back populated cart
const getFullCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId });
      }
      await cart.save();
    }

    const populatedCart = await getFullCart(userId);
    res.status(200).json(populatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    let cart = await getFullCart(req.user._id);
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );
      await cart.save();
    }

    const populatedCart = await getFullCart(req.user._id);
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};
