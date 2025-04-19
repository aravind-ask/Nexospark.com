import { Request, Response, NextFunction } from "express";
import { Service, IService } from "../models/Service";
import { AppError } from "../middleware/errorHandler";

// Create a new service
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all published services
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = { isPublished: true };
    if (category) query.category = category;

    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Service.countDocuments(query);

    res.status(200).json({
      status: "success",
      results: services.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: {
        services,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all services (admin only)
export const getAllServicesAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: services.length,
      data: {
        services,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single service
export const getService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!service) {
      return next(new AppError("No service found with that slug", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a service
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return next(new AppError("No service found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a service
export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return next(new AppError("No service found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Publish/Unpublish a service
export const toggleServiceStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(new AppError("No service found with that ID", 404));
    }

    service.isPublished = !service.isPublished;
    await service.save();

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    next(error);
  }
};
