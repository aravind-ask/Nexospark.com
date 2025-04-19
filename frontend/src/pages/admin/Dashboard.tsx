import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  GraduationCap,
  Newspaper,
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "18",
      icon: GraduationCap,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Blog Posts",
      value: "45",
      icon: Newspaper,
      change: "+15%",
      trend: "up",
    },
    {
      title: "Services",
      value: "12",
      icon: Briefcase,
      change: "+5%",
      trend: "up",
    },
    {
      title: "Job Applications",
      value: "156",
      icon: Users,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$24,500",
      icon: DollarSign,
      change: "+18%",
      trend: "up",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp
                className={`w-4 h-4 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        New job application received
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">View</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
