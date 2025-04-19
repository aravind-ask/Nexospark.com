import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import CourseForm from "../../components/admin/CourseForm";
import { courseService } from "../../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll();
      setCourses(response.data.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "level",
      label: "Level",
      render: (item: any) =>
        item.level.charAt(0).toUpperCase() + item.level.slice(1),
    },
    {
      key: "duration",
      label: "Duration",
      render: (item: any) => `${item.duration} hours`,
    },
    {
      key: "price",
      label: "Price",
      render: (item: any) => `$${item.price.toFixed(2)}`,
    },
    {
      key: "instructor",
      label: "Instructor",
      render: (item: any) => item.instructor?.name || "Unassigned",
    },
  ];

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const handleDelete = async (course: any) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(course._id);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleToggleStatus = async (course: any) => {
    try {
      await courseService.toggleStatus(course._id);
      fetchCourses();
    } catch (error) {
      console.error("Error toggling course status:", error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingCourse) {
        await courseService.update(editingCourse._id, data);
      } else {
        await courseService.create(data);
      }
      fetchCourses();
      setIsFormOpen(false);
      setEditingCourse(null);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-2 text-gray-600">
            Manage your course catalog and curriculum.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingCourse(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          showStatus={true}
        />
      )}

      <CourseForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingCourse}
      />
    </div>
  );
};

export default Courses;
