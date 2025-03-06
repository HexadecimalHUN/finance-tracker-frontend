import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconProp, library} from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft,faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

interface SpendingCategoryDTO{
    id: number;
    name: string;
    iconName: string;
};

interface ExpenseModalProps {
    isActive: boolean;
    closeModal: () => void;
    onSaveExpense:(description: string, transactionDate: string, amount: number, category: SpendingCategoryDTO | null) => void;

}

export default function CreateExpenseModal({
    isActive,
    closeModal,
    onSaveExpense
}: ExpenseModalProps){
    const [categories, setCategories] = useState<SpendingCategoryDTO[]> ([]);
    const [expenseName, setExpenseName] = useState<string>("");
    const [expenseAmount, setExpenseAmount] = useState<number>(0);
    const [expenseDate, setExpenseDate ] = useState<string>(new Date().toISOString().split("T")[0]);
    const [selectedCategory, setSelectedCategory] = useState<SpendingCategoryDTO | null>(null);
    const [dropdownActive, setDropdownActive] = useState<boolean>(false);

    useEffect(()=>{
        async function fetchCategories(){
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,{
                    method: "GET",
                    headers: headers,
                });

                if (response.ok){
                    const data = await response.json();
                    console.log(data);
                    setCategories(data);
                } else{
                    console.error("Failed to fetch categories: ", response.statusText);
                }
            }catch(error){
                console.error("Error fetching categories:", error)
            }
        }
        if (isActive){
            fetchCategories();
        }

    },[isActive]);

    const handleSave = () =>{
        onSaveExpense(expenseName, expenseDate, expenseAmount, selectedCategory)
    }

    const handleClose = () => {
        closeModal(); // Trigger close
      };

    const handleCategorySelect = (category: SpendingCategoryDTO) => {
        setSelectedCategory(category);
        setDropdownActive(false); // Close the dropdown after selection
    };


    
    return(
        <AnimatePresence>
        {isActive && (
        <motion.div
        initial={{ x: "100vw", opacity: 0 }} // Starts off-screen to the right
        animate={{ x: 0, opacity: 1 }} // Animates in from the right
        exit={{ x: "100vw", opacity: 0 }} // Animates out to the right
        transition={{ type: "spring", stiffness: 40 }} // Adjust the animation feel
        className="flex flex-col w-full  h-screen shadow-xl bg-slate-100 divide divide-y divide-y-2 divide-solid divide-slate-400 font-serif"
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
                <div className="text-3xl text-slate-800">Add new expense</div>
            </div>
            <div className="flex flex-col w-full p-10 gap-10">
            {/*  Description input */}
                <div className="">
                    <div className="p-2 font-semibold text-md text-themePurple">Expense description</div>
                    <input
                        placeholder="Description"
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="text-xl p-2 focus:outline-none bg-slate-100 text-slate-700 w-full lg:max-w-30r border border-3 border-solid border-themePurple rounded-md shadow-xl shadow-slate-650"
                    />
                </div>

                {/*  Category Selector */}
                <div className="">
                    <div className="p-2 font-semibold text-md text-themePurple">Expense category</div>
                    <div className="relative">
                        <button
                            className="text-xl p-2 border border-3 border-themePurple rounded-md bg-slate-100 flex items-center gap-2 lg:max-w-30r w-full justify-between shadow-xl shadow-slate-650"
                            onClick={() => setDropdownActive(!dropdownActive)}
                        >
                            {selectedCategory ? (
                            <>
                                <FontAwesomeIcon icon={selectedCategory.iconName as IconProp} className="h-6 w-6" />
                                <span>{selectedCategory.name}</span>
                            </>
                            ) : (
                            <span className="text-md text-slate-500">Select a Category</span>
                            )}
                            <FontAwesomeIcon icon={dropdownActive ? faCaretUp : faCaretDown} className="text-themePurple" />
                        </button>
                        
                        {/*  Category Selector Dropdown */}
                        {dropdownActive && (
                            <div className="absolute mt-2 bg-slate-100 border border-themePurple rounded-md shadow-lg w-full lg:max-w-30r z-10 ">
                            {categories.map((category) => (
                                <button
                                key={category.id}
                                className={`p-2 w-full flex items-center gap-2 ${selectedCategory?.id === category.id ? "bg-themePurple text-white" : "text-slate-700"}`}
                                onClick={() => handleCategorySelect(category)}
                                >
                                <FontAwesomeIcon icon={category.iconName as IconProp} className="h-6 w-6" />
                                <span>{category.name}</span>
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

                {/*  Amount Input */}
                <div className="">
                    <div className="p-2 font-semibold text-md text-themePurple">Expense amount</div>
                    <input
                        placeholder="Amount"
                        type="number"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
                        className="text-xl p-2 focus:outline-none bg-slate-100 text-slate-700 w-full lg:max-w-30r border border-3 border-solid border-themePurple rounded-md shadow-xl shadow-slate-650"
                    />
                </div>

                {/*  Transaction Date Selector */}
                <div className="">
                    <div className="p-2 font-semibold text-md text-themePurple">Expense date</div>
                    <input
                        type="date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                        className="text-xl p-2 focus:outline-none bg-slate-100 text-slate-700 w-full lg:max-w-30r border border-3 border-solid border-themePurple rounded-md shadow-xl shadow-slate-650"
                    />
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
                    Save expense
                </motion.button>
                </div>
            </div>
        </motion.div>
         )}
    </AnimatePresence>
    );
}