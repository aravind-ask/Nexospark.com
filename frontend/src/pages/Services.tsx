import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  Users,
  Wrench,
  Building2,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import { serviceService } from "../services/api";

interface Service {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  features: string[];
  isActive: boolean;
}

const services = [
  {
    title: "Workshops",
    description:
      "Interactive hands-on workshops designed to provide practical experience in drone technology.",
    icon: GraduationCap,
    features: [
      "Hands-on drone assembly",
      "Flight training sessions",
      "Safety protocols",
      "Maintenance workshops",
      "Industry best practices",
    ],
  },
  {
    title: "Internships",
    description:
      "Real-world experience opportunities in drone technology and manufacturing.",
    icon: Briefcase,
    features: [
      "Industry mentorship",
      "Project-based learning",
      "Professional networking",
      "Skill development",
      "Career guidance",
    ],
  },
  {
    title: "STEM Programs",
    description:
      "Comprehensive STEM education programs focused on drone technology.",
    icon: BookOpen,
    features: [
      "Science integration",
      "Technology applications",
      "Engineering principles",
      "Mathematics concepts",
      "Project-based learning",
    ],
  },
  {
    title: "Curriculum Development",
    description:
      "Custom educational curricula for institutions and organizations.",
    icon: FileText,
    features: [
      "Customized learning paths",
      "Industry-aligned content",
      "Assessment tools",
      "Resource materials",
      "Teacher training",
    ],
  },
  {
    title: "Training Programs",
    description:
      "Professional training programs for drone pilots and technicians.",
    icon: Users,
    features: [
      "Certification preparation",
      "Advanced techniques",
      "Safety protocols",
      "Equipment handling",
      "Field operations",
    ],
  },
  {
    title: "Custom Drone Solutions",
    description:
      "Tailored drone solutions for specific industry needs and applications.",
    icon: Wrench,
    features: [
      "Custom development",
      "Integration services",
      "Performance optimization",
      "Technical support",
      "Maintenance services",
    ],
  },
];

const industries = [
  {
    title: "Education",
    description: "Drone technology integration in educational institutions.",
    icon: Building2,
  },
  {
    title: "Agriculture",
    description: "Drone solutions for farming and crop management.",
    icon: Globe,
  },
  {
    title: "Security",
    description: "Advanced security and surveillance solutions.",
    icon: Shield,
  },
  {
    title: "Energy",
    description: "Drone applications in energy sector operations.",
    icon: Zap,
  },
];

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAll();
      setServices(response.data.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 mb-8"
      >
        Our Services
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.shortDescription}</p>
              <div className="mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={`/services/${service.slug}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
