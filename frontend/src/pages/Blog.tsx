import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogService } from "@/services/api";
import {
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  category: string;
  createdAt: string;
}

const categories = [
  "All",
  "Technology",
  "Education",
  "Industry News",
  "Research",
  "Events",
];

const featuredPost = {
  title: "The Future of Drone Technology in Education",
  excerpt:
    "Explore how drone technology is revolutionizing STEM education and creating new opportunities for students worldwide.",
  image: "/images/blog/featured.jpg",
  category: "Education",
  date: "March 15, 2024",
  readTime: "5 min read",
  author: "Dr. Sarah Chen",
};

const recentPosts = [
  {
    title: "Latest Advances in Drone Battery Technology",
    excerpt:
      "Discover the cutting-edge developments in drone battery technology and their impact on flight duration.",
    image: "/images/blog/post1.jpg",
    category: "Technology",
    date: "March 10, 2024",
    readTime: "4 min read",
  },
  {
    title: "Drone Regulations: A Global Perspective",
    excerpt:
      "An in-depth look at drone regulations across different countries and their impact on the industry.",
    image: "/images/blog/post2.jpg",
    category: "Industry News",
    date: "March 8, 2024",
    readTime: "6 min read",
  },
  {
    title: "Building Your First Drone: A Beginner's Guide",
    excerpt:
      "Step-by-step guide to building your first drone, from selecting components to successful flight.",
    image: "/images/blog/post3.jpg",
    category: "Education",
    date: "March 5, 2024",
    readTime: "8 min read",
  },
];

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Link to={`/blog/${blog.slug}`}>
              <div className="relative h-48">
                <img
                  src={blog.images[0] || "/placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {blog.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{blog.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
