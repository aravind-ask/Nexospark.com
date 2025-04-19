import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import FormModal from "./FormModal";

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
}

const CourseForm: React.FC<CourseFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    level: "beginner",
    duration: "",
    price: "",
    shortDescription: "",
    description: "",
    prerequisites: [""],
    objectives: [""],
    curriculum: [
      {
        title: "",
        lessons: [{ title: "", content: "" }],
      },
    ],
    isPublished: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.map((prereq, i) =>
        i === index ? value : prereq
      ),
    }));
  };

  const addPrerequisite = () => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: [...prev.prerequisites, ""],
    }));
  };

  const removePrerequisite = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index),
    }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }));
  };

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const removeObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const handleCurriculumChange = (
    sectionIndex: number,
    lessonIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          return {
            ...section,
            lessons: section.lessons.map((lesson, lIndex) => {
              if (lIndex === lessonIndex) {
                return { ...lesson, [field]: value };
              }
              return lesson;
            }),
          };
        }
        return section;
      }),
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        {
          title: "",
          lessons: [{ title: "", content: "" }],
        },
      ],
    }));
  };

  const addLesson = (sectionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((section, index) => {
        if (index === sectionIndex) {
          return {
            ...section,
            lessons: [...section.lessons, { title: "", content: "" }],
          };
        }
        return section;
      }),
    }));
  };

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          return {
            ...section,
            lessons: section.lessons.filter(
              (_, lIndex) => lIndex !== lessonIndex
            ),
          };
        }
        return section;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Course" : "Add New Course"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (hours)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prerequisites
          </label>
          <div className="mt-2 space-y-2">
            {formData.prerequisites.map((prereq, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={prereq}
                  onChange={(e) =>
                    handlePrerequisiteChange(index, e.target.value)
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removePrerequisite(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPrerequisite}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Prerequisite
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Learning Objectives
          </label>
          <div className="mt-2 space-y-2">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addObjective}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Objective
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Curriculum
          </label>
          <div className="mt-4 space-y-6">
            {formData.curriculum.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border rounded-lg p-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleCurriculumChange(
                      sectionIndex,
                      0,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Section Title"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
                />
                <div className="space-y-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) =>
                          handleCurriculumChange(
                            sectionIndex,
                            lessonIndex,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Lesson Title"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <textarea
                        value={lesson.content}
                        onChange={(e) =>
                          handleCurriculumChange(
                            sectionIndex,
                            lessonIndex,
                            "content",
                            e.target.value
                          )
                        }
                        placeholder="Lesson Content"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeLesson(sectionIndex, lessonIndex)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLesson(sectionIndex)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Lesson
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Section
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-5 h-5 mr-2" />
            {initialData ? "Update Course" : "Create Course"}
          </motion.button>
        </div>
      </form>
    </FormModal>
  );
};

export default CourseForm;
