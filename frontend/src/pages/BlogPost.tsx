import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { blogService } from "@/services/api";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  category: string;
  createdAt: string;
  links: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const response = await blogService.getBySlug(slug!);
      setBlog(response.data.data.blog);
    } catch (error) {
      console.error("Error fetching blog post:", error);
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

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Blog post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {blog.category}
            </span>
            <span className="ml-4 text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-600">{blog.description}</p>
        </header>

        {blog.images.length > 0 && (
          <div className="mb-8">
            <img
              src={blog.images[0]}
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.links && blog.links.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Links
            </h2>
            <ul className="space-y-2">
              {blog.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default BlogPost;
