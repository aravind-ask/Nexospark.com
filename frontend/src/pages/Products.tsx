import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: "zeus-nex-zeus",
    slug: "zeus-nex-zeus",
    name: "Zeus Nex Zeus",
    description:
      "Advanced power system for drones with intelligent power management and extended flight time.",
    image: "/products/zeus.jpeg",
    category: "Power Systems",
    rating: 4.5,
  },
  {
    id: "venom-30a-nex-venom",
    slug: "venom-30a-nex-venom",
    name: "Venom 30a Nex Venom",
    description:
      "High-performance 4-in-1 ESC with advanced features and reliable power delivery.",
    image: "/products/venom.jpeg",
    category: "Electronics",
    rating: 4.7,
  },
  {
    id: "nex-goblin",
    slug: "nex-goblin",
    name: "Nex Goblin",
    description:
      "Premium electric motors and propellers designed for optimal performance and efficiency.",
    image: "/products/nex-goblin.jpeg",
    category: "Motors & Propellers",
    rating: 4.3,
  },
  {
    id: "nex-hornet",
    slug: "nex-hornet",
    name: "Nex Hornet",
    description:
      "Micro-class FPV platform offering exceptional agility and immersive flying experience.",
    image: "/products/nex-hornet.jpeg",
    category: "FPV Platforms",
    rating: 4.8,
  },
];

const categories = [
  "All",
  "Power Systems",
  "Electronics",
  "Motors & Propellers",
  "FPV Platforms",
];

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Explore our innovative drone components and platforms, engineered for
          performance, reliability, and cutting-edge technology.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <div className="mb-12 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📋</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow"
          >
            <Link
              to={`/products/${product.slug}`}
              className="flex flex-col md:flex-row w-full"
            >
              {/* Image */}
              <div className="md:w-1/3 h-64 md:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Details */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {product.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">
                      {product.rating} / 5
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 hover:text-primary transition-colors">
                    View Details
                    <span className="inline-block w-4 h-4 ml-1">➔</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-600">
            No products found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsPage;
