import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // moved shipping fields into a subdocument
    shippingDetails: {
      address: {
        type: String,
        required: function () {
          return !this.isAdmin;
        },
      },
      phoneNumber: {
        type: String,
        required: function () {
          return !this.isAdmin;
        },
      },
      state: {
        type: String,
        required: function () {
          return !this.isAdmin;
        },
      },
      pincode: {
        type: Number,
        required: function () {
          return !this.isAdmin;
        },
      },
      city: {
        type: String,
        required: function () {
          return !this.isAdmin;
        },
      },
      country: {
        type: String,
        required: function () {
          return !this.isAdmin;
        },
      },
      landmark: {
        type: String,
        // optional always
      },
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
