import React, { useState } from "react";
import { motion } from "framer-motion";

interface EmailModalProps {
  isActive: boolean;
  closeModal: () => void;
  onSaveEmail: (newEmail: string) => void;
  currentEmail: string;
}

export default function EmailModal({
  isActive,
  closeModal,
  onSaveEmail,
  currentEmail,
}: EmailModalProps) {
  const [newEmail, setNewEmail] = useState(currentEmail);

  const handleSave = () => {
    onSaveEmail(newEmail);
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed flex w-full h-screen bg-black/60 backdrop-blur-md flex-col items-center justify-center">
      <div className="flex lg:max-w-35r lg:h-auto h-screen w-screen bg-slate-100 lg:rounded-lg divide divide-y divide-y-2 divide-solid divide-slate-400 flex-col">
        <div className="flex justify-center w-full text-3xl pt-6 pb-6 text-slate-700 font-medium">Change Email</div>
        <div className="flex w-full justify-center items-center">
          <input
            type="email"
            placeholder={currentEmail}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full h-auto p-6 text-2xl border-none focus:outline-none bg-slate-100 text-slate-700"
          />
        </div>
        <div className="flex justify-end items-end gap-8 p-6 text-xl font-bold">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-auto h-auto text-slate-600 hover:text-themePurple transition duration-300 ease-in-out"
          >
            Save
          </motion.button>
          <motion.button
            onClick={closeModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-auto h-auto text-slate-600 hover:text-themePurple transition duration-300 ease-in-out"
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </div>
  );
}