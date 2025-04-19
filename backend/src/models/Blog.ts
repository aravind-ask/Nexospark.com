import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  featuredImage: string;
  status: "draft" | "published";
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    excerpt: {
      type: String,
      required: [true, "Please provide an excerpt"],
      maxlength: [200, "Excerpt cannot be more than 200 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Technology", "Education", "Industry News", "Research", "Events"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featuredImage: {
      type: String,
      required: [true, "Please provide a featured image"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    readTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
blogSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  next();
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
