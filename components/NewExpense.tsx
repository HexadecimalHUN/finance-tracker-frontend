import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTags } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

import CreateExpenseModal from "./newExpense/CreateExpenseModal";
import CreateCategoryModal from "./newExpense/CreateCategoryModal";


interface SpendingCategoryDTO{
    id: number;
    name: string;
    iconName: string;
};

export default function NewExpense(){
    
    const [activeModal, setActiveModal] = useState<string>("");
    const isAuthenticated = useAuth(); 

    console.log("Active Modal:"+JSON.stringify(activeModal))

    if(!isAuthenticated){
        return(
            <div className="w-full h-screen flex bg-black justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }

    const handleSaveExpense = async(
        expenseName: string, expenseDate: string, expenseAmount: number, expenseCategory: SpendingCategoryDTO | null
    )=>{

        if (!expenseCategory) {
            console.error("No category selected");
            return;
        }

        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/category/${expenseCategory.id}`;

        const body = {
            description: expenseName,
            transactionDate: expenseDate,
            amount: expenseAmount, 
        };

        try{
            const response = await fetch(url,{
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });
            if (response.ok){
                const data = await response.json();
                console.log("Transaction created: ", data);
                setActiveModal("");
            }else{
                console.error("Failed to create transaction: ", response.statusText);
            }
            
        }catch(error){
            console.error("Error creating transaction: ", error)
        }
    }

    const handleSaveCategory = async(categoryName: string, categoryIcon: string) =>{
        console.log("Test 1")
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;

        const body = {
            name: categoryName,
            iconName: categoryIcon,
        };

        console.log("Request Body: ", JSON.stringify(body));

        try{
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (response.ok){
                const data= await response.json();
                console.log("Category created: ", data);
                setActiveModal("")

            }else{
                console.error("Failed to create category: ", response.statusText);
            }
        }catch(error){
            console.error("Error creating category: ", error);
        }

    }
        


    return(
        <div className="flex md:ml-20 bg-slate-100 w-full  h-screen justify-start overflow-hidden">
            {activeModal === "" && (
                <div className="flex font-serif w-full h-screen flex-col justify-center items-center">
                    <div className="flex justify-start items-end font-serif w-screen h-screen flex-col ">
                        <div className="flex bg-gradient-to-r from-genericPurpleGradient1 to-genericPurpleGradient2 md:h-1/2 h-auto md:w-3/4 w-full md:rounded-tl-lg md:rounded-bl-lg p-10 md:mt-32 mt-20 flex-col p-12 shadow-2xl shadow-slate-950">
                            <div className="flex md:text-5xl text-4xl text-white font-semibold pt-4 pb-4 md:pl-6">Register new expense</div>
                            <div className="flex md:text-2xl text-lg text-white md:p-6 pt-4 pb-4 ">Effortlessly manage your expenses by adding transactions under existing categories or creating new categories tailored to your financial needs.</div>
                        </div>
                    </div>
                    {/* Buttons Section */}
                    <div className=" md:absolute flex lg:w-70r md:w-40r w-full justify-center h-full items-center lg:gap-40 md:gap-20 gap-4  md:p-12  p-4  md:flex-row flex-col">
                        {/* Add New Expense Button */}
                        <motion.button
                            onClick={()=> setActiveModal("addExpense")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-row items-center justify-center bg-themePurple text-white h-48 lg:w-35r md:w-72 w-full md:p-10 p-6 rounded-lg hover:bg-genericPurpleGradient3 transition-all duration-500 ease-in-out lg:gap-16 gap-8 md:mt-48 shadow-2xl shadow-slate-950 hover:shadow-genericPurpleGradient3"
                        >
                            <FontAwesomeIcon icon={faWallet} className="lg:h-20 h-14 h-10 lg:w-20 w-14 " />
                            <div className="lg:text-4xl text-3xl font-medium text-start">Add new expense</div>
                        </motion.button>

                        {/* Create New Category Button */}
                        <motion.button
                            onClick={()=> setActiveModal("createCategory")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-row items-center justify-center bg-themePurple text-white h-48 lg:w-35r md:w-72 w-full md:p-10 p-6 rounded-lg hover:bg-genericPurpleGradient3 transition-all duration-500 ease-in-out lg:gap-16 gap-8 md:mt-48 shadow-2xl shadow-slate-950 hover:shadow-genericPurpleGradient3"
                        >
                            <FontAwesomeIcon icon={faTags} className="lg:h-20 h-14 lg:w-20 w-14" />
                            <div className="lg:text-4xl text-3xl font-medium text-start">Create new category</div>
                        </motion.button>
                    </div>
                </div>
                )}
            <CreateExpenseModal
                isActive = {activeModal === "addExpense"}
                closeModal={() => setActiveModal("")}
                onSaveExpense={handleSaveExpense}
            />
            <CreateCategoryModal
                isActive = {activeModal === "createCategory"}
                closeModal={() => setActiveModal("")}
                onSaveCategory={handleSaveCategory}
            />
        </div>
    )
}