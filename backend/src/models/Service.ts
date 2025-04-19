import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  icon: string;
  features: string[];
  image: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Service must have a title"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Service must have a description"],
    },
    shortDescription: {
      type: String,
      required: [true, "Service must have a short description"],
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Service must have a category"],
    },
    icon: {
      type: String,
      required: [true, "Service must have an icon"],
    },
    features: [
      {
        type: String,
        required: [true, "Service must have features"],
      },
    ],
    image: {
      type: String,
      required: [true, "Service must have an image"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
serviceSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-");
  next();
});

export const Service = mongoose.model<IService>("Service", serviceSchema);
