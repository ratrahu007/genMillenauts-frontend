import { motion } from "framer-motion";

export default function TestMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-green-600 text-white p-4 rounded-lg shadow-lg"
    >
      ✅ Framer Motion v12 works perfectly with React 19!
    </motion.div>
  );
}
