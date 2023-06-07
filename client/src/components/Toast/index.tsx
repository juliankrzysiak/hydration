import { useEffect } from "react";
import { useToastStore } from "../../store";
import { motion, AnimatePresence } from "framer-motion";
import cancel from "@/assets/cancel.svg";

export const Toast = () => {
  const content = useToastStore((state) => state.toast);

  useEffect(() => {
    setTimeout(() => {
      useToastStore.setState({ toast: "" });
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
            onClick={() => useToastStore.setState({ toast: "" })}
            className=""
          >
            <img className="w-6" src={cancel} alt="Cancel" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
