// src/components/Sidebar.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbox } from "react-icons/io5";

export default function Chat() {
  const [modal, setModal] = useState<boolean | null>(null);

  return (
    <aside className="fixed bottom-40 right-6 flex flex-col items-center gap-4 shadow-lg p-3 rounded-2xl transition-colors">

      {/* Dark button */}
      <button
        title="chat"
        type="button"
        onClick={() => setModal(true)}
        className="flex items-center justify-center cursor-pointer w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-700 text-white hover:scale-105 transition-transform overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <IoChatbox size={20} />
            </motion.span>
        </AnimatePresence>
      </button>
    </aside>
  );
}
