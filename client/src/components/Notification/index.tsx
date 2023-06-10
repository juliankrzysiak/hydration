import { useEffect } from "react";
import { useNotificationStore } from "../../stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "@/assets/cancel.svg";
import alert from "@/assets/alert.svg";
import info from "@/assets/info.svg";

export const Notification = () => {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     useNotificationStore.setState({ message: "" });
  //   }, 5000);
  //   return () => clearTimeout(timeout);
  // }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={` fixed bottom-7 left-1/2 z-30 flex  max-w-xs -translate-x-1/2 rounded-xl border border-gray-500 py-2 pl-4 pr-2 ${
            type === "info" ? "bg-green-200" : " bg-red-200"
          }`}
        >
          {type === "error" && <img className="w-8" src={alert} alt="Alert!" />}
          {type === "info" && (
            <img className="w-8" src={info} alt="Information" />
          )}

          <p className="ml-3 w-52 font-['Inter']">{message}</p>
          <div className="ml-2 w-0.5 bg-neutral-500/30" />
          <button
            onClick={() => useNotificationStore.setState({ message: "" })}
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
