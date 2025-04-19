import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Heart,
  Lightbulb,
  Globe,
  ArrowRight,
  MapPin,
  Clock,
  Building2,
  GraduationCap,
} from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "Pushing boundaries in drone technology",
    icon: Lightbulb,
  },
  {
    title: "Collaboration",
    description: "Working together to achieve greatness",
    icon: Users,
  },
  {
    title: "Sustainability",
    description: "Committed to environmental responsibility",
    icon: Heart,
  },
  {
    title: "Global Impact",
    description: "Making a difference worldwide",
    icon: Globe,
  },
];

const openPositions = [
  {
    title: "Senior Drone Engineer",
    department: "Engineering",
    location: "Tech City, TC",
    type: "Full-time",
    description:
      "Lead the development of next-generation drone technology and systems.",
  },
  {
    title: "STEM Education Specialist",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    description:
      "Develop and implement innovative STEM education programs using drone technology.",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Tech City, TC",
    type: "Full-time",
    description:
      "Drive product development and market strategy for our drone solutions.",
  },
  {
    title: "Research Scientist",
    department: "R&D",
    location: "Tech City, TC",
    type: "Full-time",
    description:
      "Conduct cutting-edge research in drone technology and applications.",
  },
];

const benefits = [
  {
    title: "Competitive Salary",
    description: "Industry-leading compensation packages",
    icon: Briefcase,
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
    icon: Heart,
  },
  {
    title: "Learning & Development",
    description: "Continuous learning opportunities and professional growth",
    icon: GraduationCap,
  },
  {
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options",
    icon: Clock,
  },
  {
    title: "Modern Office",
    description: "State-of-the-art facilities and equipment",
    icon: Building2,
  },
  {
    title: "Global Team",
    description: "Work with talented professionals worldwide",
    icon: Globe,
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600">
              Be part of a team that's shaping the future of drone technology
              and education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Nexospark.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us in building the future of drone technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {position.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {position.department}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {position.location}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {position.type}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{position.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Nexospark?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive benefits and opportunities for growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our team and help shape the future of drone technology and
              education.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-secondary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View All Positions
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
