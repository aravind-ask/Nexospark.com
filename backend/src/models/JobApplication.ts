import mongoose, { Document, Schema } from "mongoose";

export interface IJobApplication extends Document {
  position: string;
  applicant: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "accepted";
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    position: {
      type: String,
      required: [true, "Please specify the position you're applying for"],
      trim: true,
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      trim: true,
    },
    resume: {
      type: String,
      required: [true, "Please upload your resume"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please provide a cover letter"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "shortlisted", "rejected", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplication = mongoose.model<IJobApplication>(
  "JobApplication",
  jobApplicationSchema
);
