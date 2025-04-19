import { Request, Response, NextFunction } from "express";
import { Blog, IBlog } from "../models/Blog";
import { AppError } from "../middleware/errorHandler";

// Create a new blog post
export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user!._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all published blog posts
export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, tag, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = { status: "published" };
    if (category) query.category = category;
    if (tag) query.tags = tag;

    const blogs = await Blog.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      status: "success",
      results: blogs.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: {
        blogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all blog posts (for employees and admins)
export const getAllBlogsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single blog post
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate(
      "author",
      "name"
    );

    if (!blog) {
      return next(new AppError("No blog post found with that slug", 404));
    }

    // Check if user has permission to view draft posts
    if (
      blog.status === "draft" &&
      req.user!.role !== "admin" &&
      blog.author._id.toString() !== req.user!._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to view this post", 403)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a blog post
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError("No blog post found with that ID", 404));
    }

    // Check if user has permission to update this post
    if (
      req.user!.role !== "admin" &&
      blog.author.toString() !== req.user!._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to update this post", 403)
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        blog: updatedBlog,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a blog post
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError("No blog post found with that ID", 404));
    }

    // Check if user has permission to delete this post
    if (
      req.user!.role !== "admin" &&
      blog.author.toString() !== req.user!._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to delete this post", 403)
      );
    }

    await blog.deleteOne();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
