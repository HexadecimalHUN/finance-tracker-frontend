import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

library.add(fas);

interface IconDTO {
  id: number;
  name: string;
}

interface CategoryModalProps {
  isActive: boolean;
  closeModal: () => void;
  onSaveCategory: (categoryName: string, iconName: string) => void;
}

export default function CreateCategoryModal({
  isActive,
  closeModal,
  onSaveCategory,
}: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [icons, setIcons] = useState<IconDTO[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found for fetching icons");
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/icons/predefined`;

        const response = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const formattedIcons = data.map((icon: IconDTO) => ({
            ...icon,
            // Only convert internal uppercase letters to kebab-case
            name: icon.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          }));
          setIcons(formattedIcons);
        } else {
          console.error("Error fetching icons:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    }

    fetchIcons();
  }, []);

  const handleSave = () => {
    onSaveCategory(categoryName, selectedIcon);
  };

  const handleClose = () => {
    closeModal(); // Trigger close
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="modal"
          initial={{ x: "100vw", opacity: 0 }} // Starts off-screen to the right
          animate={{ x: 0, opacity: 1 }} // Animates in from the right
          exit={{ x: "100vw", opacity: 0 }} // Animates out to the right
          transition={{ type: "spring", stiffness: 40 }} // Adjust the animation feel
          className="flex flex-col w-full h-screen shadow-xl bg-slate-100 divide divide-y divide-y-2 divide-solid divide-slate-400 font-serif"
        >
          <div className="w-full h-auto flex items-center p-5 gap-5 flex-row mt-12 md:mt-0 shadow-lg shadow-slate-650">
            <motion.button 
                className="h-10 w-10" 
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                
              <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8 text-themePurple"></FontAwesomeIcon>
            </motion.button>
            <div className="text-3xl text-slate-800">Create new category</div>
          </div>
          <div className="flex flex-col gap-10 w-full p-10">
            <div className="">
            <div className="p-2 font-semibold text-md text-themePurple">Category name</div>
                <input
                placeholder="Category Name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="text-xl p-2 focus:outline-none bg-slate-100 text-slate-700 w-full lg:max-w-30r border border-3 border-solid border-themePurple rounded-md shadow-xl shadow-slate-650 "
                />
            </div>
            <div className="">
                <div className="p-2 font-semibold text-md text-themePurple">Category icon</div>
                <div className="relative">
                <button
                    onClick={() => setDropdownActive(!dropdownActive)}
                    className="text-xl p-2 border border-themePurple rounded-md bg-slate-100 flex items-center gap-2 border-3  lg:max-w-30r w-full justify-between shadow-xl shadow-slate-650"
                >
                    {selectedIcon ? (
                    <FontAwesomeIcon icon={selectedIcon as IconProp} className="h-6 w-6" />
                    ) : (
                    <span className="text-md text-slate-500">Select an icon</span>
                    )}
                    <FontAwesomeIcon icon={dropdownActive ? faCaretUp : faCaretDown} className="text-themePurple" />
                </button>

                {/* Dropdown of icons */}
                {dropdownActive && (
                    <div className="absolute mt-2 bg-slate-100 border border-themePurple rounded-md shadow-lg w-48 border-3 shadow-xl shadow-slate-650">
                    <div className="flex p-2 grid grid-cols-4 gap-3 justify-center items-center">
                        {icons.map((icon) => (
                        <button
                            key={icon.id}
                            className={`p-2 ${selectedIcon === icon.name ? "bg-themePurple text-white" : "text-slate-700"} justify-center items-center flex rounded-md`}
                            onClick={() => setSelectedIcon(icon.name)}
                        >
                            <FontAwesomeIcon icon={icon.name as IconProp} className="h-6 w-6 flex justify-center items-center" />
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div>
            <div className="flex justify-end gap-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-lg font-semibold text-themePurple"
                onClick={handleClose}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-lg font-semibold text-themePurple"
                onClick={handleSave}
              >
                Save category
              </motion.button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
