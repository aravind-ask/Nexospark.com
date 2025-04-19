import { Request, Response, NextFunction } from "express";
import { Course, ICourse } from "../models/Course";
import { AppError } from "../middleware/errorHandler";

// Create a new course
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all published courses
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { level, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = { isPublished: true };
    if (level) query.level = level;

    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.status(200).json({
      status: "success",
      results: courses.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: {
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all courses (admin only)
export const getAllCoursesAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single course
export const getCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!course) {
      return next(new AppError("No course found with that slug", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a course
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return next(new AppError("No course found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a course
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(new AppError("No course found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Publish/Unpublish a course
export const toggleCourseStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(new AppError("No course found with that ID", 404));
    }

    course.isPublished = !course.isPublished;
    await course.save();

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};
