import { useEffect } from "react";
import { useNotificationStore } from "../../stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "@/assets/cancel.svg";
import alert from "@/assets/alert.svg";
import info from "@/assets/info.svg";
import checkmarkCircle from "@/assets/checkmark-circle-outline.svg";

export const Notification = () => {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);

  useEffect(() => {
    const timeout = setTimeout(() => {
      useNotificationStore.setState({ message: null });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [message]);

  const renderImg = () => {
    switch (type) {
      case "error":
        return <img className="w-8" src={alert} alt="Alert" />;
      case "success":
        return <img className="w-8" src={checkmarkCircle} alt="Checkmark" />;
      default:
        <img className="w-8" src={info} alt="Information" />;
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={` fixed bottom-7 left-1/2 z-30 flex  -translate-x-1/2 items-center rounded-xl border border-gray-500 py-2 pl-4 pr-2
           ${type === "info" && "bg-neutral-200"}
           ${type === "error" && "bg-red-200"}
           ${type === "success" && "bg-green-200"}`}
        >
          {renderImg()}
          <p className="ml-3 text-xl">{message}</p>
          <button
            onClick={() => useNotificationStore.setState({ message: null })}
            aria-label="Close notification"
            className="ml-4 flex-shrink-0 border-l-2 border-gray-600/40"
          >
            <img
              aria-label="Close notification"
              className="w-8"
              src={cancel}
              alt="Cancel"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
