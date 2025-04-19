import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { serviceService } from "../services/api";
import { CheckCircle, Clock, Star, ChevronRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  shortDescription: string;
  images: string[];
  features: string[];
  rating: number;
  reviews: number;
  estimatedDuration: string;
  fullDescription: string;
  process: {
    title: string;
    description: string;
  }[];
  pricing: {
    title: string;
    description: string;
    price: number;
  }[];
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPricing, setSelectedPricing] = useState(0);

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      const response = await serviceService.getBySlug(slug!);
      setService(response.data.data.service);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Service Images */}
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img
              src={service.images[selectedImage] || "/placeholder.jpg"}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {service.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
              >
                <img
                  src={image}
                  alt={`${service.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Service Info */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {service.category}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(service.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({service.reviews} reviews)</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-gray-600 mb-6">{service.fullDescription}</p>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Our Process
              </h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-3xl font-bold text-primary mb-4">
              ${service.pricing[selectedPricing].price}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {service.pricing[selectedPricing].title}
              </h3>
              <p className="text-gray-600">
                {service.pricing[selectedPricing].description}
              </p>
            </div>
            <button className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 mb-4">
              Get Started
            </button>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{service.estimatedDuration}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;
