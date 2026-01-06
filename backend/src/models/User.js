import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "CONTRACTOR"],
      default: "CONTRACTOR",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password if modified
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export const ensureAdminSeed = async () => {
  const email = "admin@gmail.com";
  const password = "Admin123";
  const name = "Admin";

  const existing = await User.findOne({ email });

  if (existing) {
    existing.password = password;
    existing.name = name;
    existing.role = "ADMIN";
    existing.isActive = true;
    await existing.save();
    return "updated";
  }

  await User.create({
    name,
    email,
    password,
    role: "ADMIN",
    isActive: true,
  });
  return "created";
};

export default User;

