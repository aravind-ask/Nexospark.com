import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import { jobApplicationService } from "../../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await jobApplicationService.getAll();
      setApplications(response.data.data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Applicant",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "position",
      label: "Position",
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "reviewed"
              ? "bg-blue-100 text-blue-800"
              : item.status === "accepted"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Applied",
      render: (item: any) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const handleView = (application: any) => {
    // Implement view functionality
    console.log("View application:", application);
  };

  const handleUpdateStatus = async (application: any, newStatus: string) => {
    try {
      await jobApplicationService.update(application._id, {
        status: newStatus,
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="mt-2 text-gray-600">
            Review and manage job applications from candidates.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={applications}
          onView={handleView}
          showActions={true}
          showStatus={false}
        />
      )}
    </div>
  );
};

export default Applications;
