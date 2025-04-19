import { Request, Response, NextFunction } from "express";
import { JobApplication, IJobApplication } from "../models/JobApplication";
import { AppError } from "../middleware/errorHandler";

// Create a new job application
export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const application = await JobApplication.create({
      ...req.body,
      applicant: req.user!._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all job applications (admin only)
export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applications = await JobApplication.find().populate(
      "applicant",
      "name email"
    );

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user's own applications
export const getMyApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applications = await JobApplication.find({
      applicant: req.user!._id,
    });

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single application
export const getApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const application = await JobApplication.findById(req.params.id).populate(
      "applicant",
      "name email"
    );

    if (!application) {
      return next(new AppError("No application found with that ID", 404));
    }

    // Check if user has permission to view this application
    if (
      req.user!.role !== "admin" &&
      application.applicant.toString() !== req.user!._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to view this application", 403)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update application status (admin only)
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return next(new AppError("No application found with that ID", 404));
    }

    application.status = req.body.status;
    await application.save();

    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete application (admin only)
export const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return next(new AppError("No application found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
