import { Cart } from "../models/cartModel.js";

// Ensure this helper is used in ALL cart controllers (add, remove, decrement)
const getFullCart = async (userId) => {
  return await Cart.findOne({ user: userId })
    .populate({
      path: "items.product",
      select: "name price image category description" // Explicitly select price
    });
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

export const decrementCart = async (req, res) => {
  try {
    // We check BOTH params and body just to be safe
    const productId = req.params.productId || req.body.productId;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required for de-authorization." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        // ACTUAL LOGIC CHECK
        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= 1;
        } else {
          // AUTO-PURGE: If quantity is 1, remove the entry from the array
          cart.items.splice(itemIndex, 1);
        }
        await cart.save();
      }
    }

    // Return the fresh state
    const populatedCart = await getFullCart(userId);
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "System_Error: Decrement_Failed", error: error.message });
  }
};

