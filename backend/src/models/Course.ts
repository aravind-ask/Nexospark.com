import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  price: number;
  thumbnail: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course must have a title"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Course must have a description"],
    },
    shortDescription: {
      type: String,
      required: [true, "Course must have a short description"],
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    level: {
      type: String,
      required: [true, "Course must have a level"],
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message: "Level must be either beginner, intermediate, or advanced",
      },
    },
    duration: {
      type: String,
      required: [true, "Course must have a duration"],
    },
    price: {
      type: Number,
      required: [true, "Course must have a price"],
      min: [0, "Price cannot be negative"],
    },
    thumbnail: {
      type: String,
      required: [true, "Course must have a thumbnail image"],
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
courseSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-");
  next();
});

export const Course = mongoose.model<ICourse>("Course", courseSchema);
