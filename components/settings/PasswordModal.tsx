import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface PasswordModalProps {
  isActive: boolean;
  closeModal: () => void;
  onSavePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => void;
}

export default function PasswordModal({
  isActive,
  closeModal,
  onSavePassword,
}: PasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const ToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const ToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSave = () => {
    onSavePassword(currentPassword, newPassword, confirmPassword);
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed flex w-full h-screen bg-black/60 backdrop-blur-md flex-col items-center justify-center">
      <div className="flex lg:max-w-35r lg:h-auto h-screen w-screen bg-slate-100 lg:rounded-lg divide divide-y divide-y-2 divide-solid divide-slate-400 flex-col">
        <div className="flex justify-center w-full text-3xl pt-6 pb-6 text-slate-700 font-medium">Change Password</div>

        <div className="flex w-full justify-center items-center flex-col">
          <div className="flex w-full flex-row justify-between p-6 pb-0">
            <div className="flex font-bold text-slate-500 text-lg">Current Password</div>
            <div className="flex">
              <motion.div
                onClick={ToggleOldPasswordVisibility}
                className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                  showOldPassword ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md justify-center items-center flex"
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 40,
                  }}
                  style={{ x: showOldPassword ? 30 : 0 }}
                >
                  <FontAwesomeIcon
                    icon={showOldPassword ? faEye : faEyeSlash}
                    className={`flex w-5 h-5 ${showOldPassword ? "text-green-500" : " text-slate-500"}`}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <input
            type={showOldPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="*******"
            className="w-full h-auto p-6 text-2xl border-none focus:outline-none bg-slate-100 text-slate-700"
          />
        </div>

        <div className="flex w-full justify-center items-center flex-col">
          <div className="flex w-full flex-row justify-between p-6 pb-0">
            <div className="flex font-bold text-slate-500 text-lg">New Password</div>
            <div className="flex">
              <motion.div
                onClick={ToggleNewPasswordVisibility}
                className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                  showNewPassword ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md justify-center items-center flex"
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 40,
                  }}
                  style={{ x: showNewPassword ? 30 : 0 }}
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEye : faEyeSlash}
                    className={`flex w-5 h-5 ${showNewPassword ? "text-green-500" : " text-slate-500"}`}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="*******"
            className="w-full h-auto p-6 text-2xl border-none focus:outline-none bg-slate-100 text-slate-700"
          />
        </div>

        <div className="flex w-full justify-center items-center flex-col">
          <div className="flex w-full flex-row justify-between p-6 pb-0">
            <div className="flex font-bold text-slate-500 text-lg">Confirm Password</div>
            <div className="flex">
              <motion.div
                onClick={ToggleConfirmPasswordVisibility}
                className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                  showConfirmPassword ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-md justify-center items-center flex"
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 40,
                  }}
                  style={{ x: showConfirmPassword ? 30 : 0 }}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    className={`flex w-5 h-5 ${showConfirmPassword ? "text-green-500" : " text-slate-500"}`}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="*******"
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