import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  specifications: {
    [key: string]: string;
  };
  features: string[];
  images: string[];
  featuredImage: string;
  inStock: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product must have a description"],
    },
    shortDescription: {
      type: String,
      required: [true, "Product must have a short description"],
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Product must have a category"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
      min: [0, "Price cannot be negative"],
    },
    specifications: {
      type: Map,
      of: String,
      required: [true, "Product must have specifications"],
    },
    features: [
      {
        type: String,
        required: [true, "Product must have features"],
      },
    ],
    images: [
      {
        type: String,
        required: [true, "Product must have at least one image"],
      },
    ],
    featuredImage: {
      type: String,
      required: [true, "Product must have a featured image"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name before saving
productSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-");
  next();
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
