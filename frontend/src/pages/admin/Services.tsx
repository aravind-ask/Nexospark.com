import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import ServiceForm from "@/components/admin/ServiceForm";
import { serviceService } from "@/services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAll();
      setServices(response.data.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (service) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await serviceService.delete(service._id);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      await serviceService.update(service._id, {
        isActive: !service.isActive,
      });
      fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingService) {
        await serviceService.update(editingService._id, formData);
      } else {
        await serviceService.create(formData);
      }
      setIsFormOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
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
      key: "shortDescription",
      label: "Description",
      render: (value) => value.substring(0, 100) + "...",
    },
    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </motion.button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <ServiceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingService(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingService}
      />
    </div>
  );
};

export default Services;
