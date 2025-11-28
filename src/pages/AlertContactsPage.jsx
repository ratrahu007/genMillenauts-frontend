import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Trash, User, Phone, Users, ArrowLeft } from "lucide-react";
import { getAlertContacts, deleteAlertContact } from "../services/userService";
import { toast } from "sonner";

const AlertContactsPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAlertContacts(token);
        setContacts(data);
      } catch (error) {
        toast.error("Failed to fetch alert contacts.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContacts();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteAlertContact(token, id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.success("Alert contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete alert contact.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <Shield size={32} className="text-red-500" />
            <h1 className="text-3xl font-bold text-gray-800">Alert Contacts</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Dashboard</span>
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="text-center">
            <p>Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-700">No alert contacts found.</h2>
            <p className="text-gray-500 mt-2">
              Add a trusted contact to be notified in case of an emergency.
            </p>
            <button
              onClick={() => navigate("/add-alert-contact")}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Add Contact
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, color: "rgb(239 68 68)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(contact.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash size={20} />
                  </motion.button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={14} />
                    <span>{contact.relation}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlertContactsPage;
