import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { courseService } from "../services/api";
import { CheckCircle, Clock, BookOpen, Users, Star } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  images: string[];
  prerequisites: string[];
  objectives: string[];
  curriculum: {
    title: string;
    lessons: {
      title: string;
      duration: string;
    }[];
  }[];
  rating: number;
  reviews: number;
  enrolledStudents: number;
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getBySlug(slug!);
      setCourse(response.data.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
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

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
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
          {/* Course Images */}
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img
              src={course.images[selectedImage] || "/placeholder.jpg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {course.images.map((image, index) => (
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
                  alt={`${course.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Course Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(course.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({course.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 mb-6">{course.description}</p>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-gray-600">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-gray-600">{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-gray-600">
                  {course.enrolledStudents} students enrolled
                </span>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Prerequisites
              </h2>
              <ul className="space-y-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-600">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Objectives */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Objectives
              </h2>
              <ul className="space-y-2">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 p-4">
                      <h3 className="font-semibold text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                    <div className="divide-y">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="p-4 flex items-center justify-between"
                        >
                          <span className="text-gray-600">{lesson.title}</span>
                          <span className="text-sm text-gray-500">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
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
              ${course.price}
            </div>
            <button className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 mb-4">
              Enroll Now
            </button>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>{course.enrolledStudents} students enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
