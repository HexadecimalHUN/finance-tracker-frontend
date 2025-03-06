import React from "react";
import { motion } from "framer-motion";

interface ErrorModalProps {
  isActive: boolean;
  closeModal: () => void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isActive, closeModal, errorMessage }) => {
  if (!isActive) return null;

  return (
    <div className="fixed flex w-full h-screen bg-black/60 backdrop-blur-md flex-col items-center justify-center">
      <div className="flex lg:max-w-35r lg:h-auto h-screen w-screen bg-slate-100 lg:rounded-lg divide divide-y divide-y-2 divide-solid divide-slate-400 flex-col">
        <div className="flex justify-center w-full text-3xl pt-6 pb-6 text-slate-700 font-medium">Update Error!</div>
        <div className="flex w-full justify-center items-start flex-col p-6">
          <div className="text-xl text-slate-700">{errorMessage}</div>
        </div>
        <div className="flex justify-end items-end gap-8 p-6 text-xl font-bold">
          <motion.button
            onClick={closeModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-auto h-auto text-slate-600 hover:text-themePurple transition duration-300 ease-in-out"
          >
            Confirm
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;