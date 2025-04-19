import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import BlogForm from "../../components/admin/BlogForm";
import { blogService } from "../../services/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAll();
      setBlogs(response.data.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
      key: "category",
      label: "Category",
    },
    {
      key: "author",
      label: "Author",
      render: (item: any) => item.author?.name || "Unknown",
    },
    {
      key: "readTime",
      label: "Read Time",
      render: (item: any) => `${item.readTime} min`,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (item: any) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleDelete = async (blog: any) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogService.delete(blog._id);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleToggleStatus = async (blog: any) => {
    try {
      await blogService.toggleStatus(blog._id);
      fetchBlogs();
    } catch (error) {
      console.error("Error toggling blog status:", error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingBlog) {
        await blogService.update(editingBlog._id, data);
      } else {
        await blogService.create(data);
      }
      fetchBlogs();
      setIsFormOpen(false);
      setEditingBlog(null);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-gray-600">
            Manage your blog content and articles.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Blog Post
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={blogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          showStatus={true}
        />
      )}

      <BlogForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBlog(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingBlog}
      />
    </div>
  );
};

export default Blogs;
