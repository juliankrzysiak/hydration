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
      case "success":
        return <img className="w-8" src={alert} alt="Alert" />;
      case "error":
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
          className={` fixed bottom-7 left-1/2 z-30 flex  max-w-xs -translate-x-1/2 rounded-xl border border-gray-500 py-2 pl-4 pr-2
           ${type === "info" && "bg-neutral-200"}
           ${type === "error" && "bg-red-200"}
           ${type === "success" && "bg-green-200"}`}
        >
          {renderImg()}
          <p className="ml-3 w-52 font-['Inter']">{message}</p>
          <div className="ml-2 w-0.5 bg-neutral-500/30" />
          <button
            onClick={() => useNotificationStore.setState({ message: null })}
            aria-label="Close notification"
            className="ml-1 flex-shrink-0"
          >
            <img
              aria-label="button"
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
