import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  Users,
  Wrench,
  ChevronRight,
  Mail,
} from "lucide-react";

const services = [
  {
    id: "workshops",
    title: "Interactive Workshops",
    description:
      "Engage in hands-on workshops that demystify drone technology, guiding participants through assembly, programming, and real-world applications.",
    icon: GraduationCap,
    keyFeatures: [
      "Expert-led practical sessions",
      "Drone-building and coding exercises",
      "Industry-relevant case studies",
    ],
    targetAudience: "Students, hobbyists, and professionals",
    duration: "2-5 days",
  },
  {
    id: "internships",
    title: "Industry Internships",
    description:
      "Immerse yourself in the drone industry with structured internships, working on cutting-edge projects under expert mentorship.",
    icon: Briefcase,
    keyFeatures: [
      "Real-world project exposure",
      "Mentorship from industry leaders",
      "Career guidance and networking",
    ],
    targetAudience: "Undergraduates and young professionals",
    duration: "3-6 months",
  },
  {
    id: "stem-programs",
    title: "STEM Education Programs",
    description:
      "Inspire the next generation with STEM programs that integrate drone technology, fostering creativity and technical skills.",
    icon: BookOpen,
    keyFeatures: [
      "Curriculum-aligned modules",
      "Hands-on robotics activities",
      "Focus on aeronautics and innovation",
    ],
    targetAudience: "K-12 students and educators",
    duration: "1-12 weeks",
  },
  {
    id: "curriculum-development",
    title: "Curriculum Development",
    description:
      "Partner with us to create tailored curricula that embed drone technology into academic programs, enhancing educational outcomes.",
    icon: FileText,
    keyFeatures: [
      "Customized for institutional needs",
      "Integration of modern technology",
      "Comprehensive teacher training",
    ],
    targetAudience: "Schools, colleges, and training centers",
    duration: "Varies by project",
  },
  {
    id: "training-programs",
    title: "Professional Training Programs",
    description:
      "Master drone operation and maintenance through professional training programs designed for pilots and technicians.",
    icon: Users,
    keyFeatures: [
      "Certified instructors",
      "Advanced simulation training",
      "Regulatory and safety compliance",
    ],
    targetAudience: "Drone operators and technicians",
    duration: "1-4 weeks",
  },
  {
    id: "custom-drone-solutions",
    title: "Custom Drone Solutions",
    description:
      "Leverage our expertise to develop bespoke drone solutions for industries like agriculture, surveillance, and logistics.",
    icon: Wrench,
    keyFeatures: [
      "End-to-end design and prototyping",
      "Industry-specific customization",
      "Ongoing technical support",
    ],
    targetAudience: "Businesses and government agencies",
    duration: "Project-dependent",
  },
];

const ServicesPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The Services we provide
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our expertly crafted services in education, training, and
          drone technology, designed to drive innovation and empower our
          partners.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full"
          >
            {/* Icon and Title */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h2>
            </div>
            {/* Description */}
            <p className="text-gray-600 mb-4 flex-grow">
              {service.description}
            </p>
            {/* Key Features */}
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {service.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            {/* Additional Details */}
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Target Audience: </span>
                {service.targetAudience}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Duration: </span>
                {service.duration}
              </p>
            </div>
            {/* Learn More */}
            {/* <a
              href={`/services/${service.id}`}
              className="mt-auto inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm"
            >
              Learn More
              <ChevronRight className="w-4 h-4 ml-1" />
            </a> */}
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Partner with Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Contact NexoSpark Pvt Ltd to discover how our services can elevate
          your educational or technological initiatives.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Get in Touch
          <Mail className="w-4 h-4 ml-2" />
        </a>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
