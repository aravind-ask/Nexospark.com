import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  Users,
  Wrench,
} from "lucide-react";

const services = [
  {
    title: "Workshops",
    description:
      "Interactive hands-on workshops for learning drone technology and applications.",
    icon: GraduationCap,
  },
  {
    title: "Internships",
    description:
      "Real-world experience opportunities in drone technology and manufacturing.",
    icon: Briefcase,
  },
  {
    title: "STEM Programs",
    description:
      "Comprehensive STEM education programs focused on drone technology.",
    icon: BookOpen,
  },
  {
    title: "Curriculum Development",
    description:
      "Custom educational curricula for institutions and organizations.",
    icon: FileText,
  },
  {
    title: "Training Programs",
    description:
      "Professional training programs for drone pilots and technicians.",
    icon: Users,
  },
  {
    title: "Custom Drone Solutions",
    description:
      "Tailored drone solutions for specific industry needs and applications.",
    icon: Wrench,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for education, training, and custom drone
            development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
