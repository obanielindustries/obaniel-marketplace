import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // MAKE SURE your product model is registered as 'Product'
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity cannot be less than 1"],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Allows virtuals to show up in JSON responses
    toObject: { virtuals: true },
  },
);

// Optional: Calculate total cart price on the fly
cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((total, item) => {
    // Note: This only works if .populate('items.product') was called
    const price = item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);
});

export const Cart = mongoose.model("Cart", cartSchema);
