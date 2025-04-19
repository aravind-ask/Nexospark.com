import { motion } from "framer-motion";

const products = [
  {
    title: "Zeus Nex Zeus",
    description:
      "Advanced power system for drones with intelligent power management and extended flight time.",
    image: "/images/products/zeus.jpg",
  },
  {
    title: "Venom 30a Nex Venom",
    description:
      "High-performance 4-in-1 ESC with advanced features and reliable power delivery.",
    image: "/images/products/venom.jpg",
  },
  {
    title: "Nex Goblin",
    description:
      "Premium electric motors and propellers designed for optimal performance and efficiency.",
    image: "/images/products/goblin.jpg",
  },
  {
    title: "Nex Hornet",
    description:
      "Micro-class FPV platform offering exceptional agility and immersive flying experience.",
    image: "/images/products/hornet.jpg",
  },
];

const Products = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our cutting-edge drone components and platforms designed
            for performance, reliability, and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
