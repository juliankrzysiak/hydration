import { useEffect } from "react";
import { useNotificationStore } from "../../stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "@/assets/cancel.svg";

export const Notification = () => {
  const content = useNotificationStore((state) => state.message);

  useEffect(() => {
    setTimeout(() => {
      useNotificationStore.setState({ message: "" });
    }, 5000);
  }, [content]);

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed bottom-7 left-1/2 flex -translate-x-1/2 gap-4 rounded-2xl bg-gray-200 px-4 py-2`}
        >
          <h3 className="text-lg">{content}</h3>
          <button
            onClick={() => useNotificationStore.setState({ message: "" })}
            className=""
          >
            <img className="w-6" src={cancel} alt="Cancel" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
