import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faPlus, faChartColumn, faGauge, faPiggyBank, faReceipt, faBars, faGear} from "@fortawesome/free-solid-svg-icons";

import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    onPageChange: (page: string)=> void;
}

const Navbar:React.FC<NavbarProps> = ({onPageChange}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        router.push("/");
    };

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    return(
        <div className="flex font-serif">
            {/* Slide bar for desktop*/}
            <div className="hidden md:flex flex-col w-20 bg-themePurple h-screen p-1 justify-between items-center pt-3 fixed">
                <motion.button 
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    className="group flex max-w-16 max-h-16 p-2 rounded-lg flex-col"
                    onClick={ () => onPageChange("summary-page")}
                    >
                    <Image src="/logo.svg" alt="Finance Tracker Logo" width={100} height={100} className="w-full h-full" />
                </motion.button>
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={ () => onPageChange("new-expense")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faPlus} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">New Expense</div>
                </motion.button>
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={() => onPageChange("view-expenses")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faChartColumn} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">View Expenses</div>
                </motion.button>
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={() => onPageChange("limits")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faGauge} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">Limits</div>
                </motion.button>

                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={() => onPageChange("savings")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faPiggyBank} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">Savings</div>
                </motion.button>

                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={() => onPageChange("plans")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faReceipt} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">Plans</div>
                </motion.button>

                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={() => onPageChange("settings")}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faGear} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">Settings</div>
                </motion.button>

                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap= {{scale:0.9}}
                    onClick={handleLogout}
                    className="group flex max-w-18 max-h-18 w-full mind-w-20 flex-col w-full items-center rounded-lg p-2 gap-2"
                    >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-8 h-8 text-slate-400 group-hover:text-slate-100 transition duration-300 ease-in-out"/>
                    <div className="text-sm w-full items-center text-center text-slate-400/0 font-light group-hover:text-slate-100 transition duration-300 ease-in-out">Log Out</div>
                </motion.button>
            </div>
            {/*Mobile Navbar Button*/}
            <div className={`md:hidden absolute flex justify-end p-3  w-full z-50`}>
                <button
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} className={`h-8 w-8 ${isOpen ? "text-slate-100": "text-black"} transition duration-300 ease-in-out`}/>
                </button>
            </div>
            {/*Mobile Menu*/}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{height:0}}
                        animate={{height:"100vh"}}
                        exit={{height:0}}
                        transition={{duration: 0.3}}
                        className={`${isOpen ? "absolute" : "hidden"} top-0 left-0 w-full bg-gradient-to-br from-themePurple to-black text-slate-400 z-40 flex flex-col items-center justify-evenly p-10 text-xl transition duration-300 ease-in-out`}
                    >
                        <motion.button
                             initial={{ scale: 0, opacity: 0 }}
                             animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             exit={{ scale: 0, opacity: 0 }} 
                             className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                             onClick={() => onPageChange("summary-page")}
                        >
                            <Image src="/logo.svg" alt="Finance Tracker Logo" width={100} height={100} className="w-full h-full" />
                            Home
                        </motion.button>
                        <motion.button
                             initial={{ scale: 0, opacity: 0 }}
                             animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             exit={{ scale: 0, opacity: 0 }} 
                             className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={ () => onPageChange("new-expense")}
                        >
                            <FontAwesomeIcon icon={faPlus} className="h-8 w-8"/>
                            New Expense
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={() => onPageChange("view-expenses")}
                        >
                            <FontAwesomeIcon icon={faChartColumn} className="h-8 w-8"/>
                            View Expenses
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={() => onPageChange("limits")}
                        >
                            <FontAwesomeIcon icon={faGauge} className="h-8 w-8"/>
                            Limits
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={() => onPageChange("savings")}
                        >
                            <FontAwesomeIcon icon={faPiggyBank} className="h-8 w-8"/>
                            Savings
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={() => onPageChange("plans")}
                        >
                            <FontAwesomeIcon icon={faReceipt} className="h-8 w-8"/>
                            Plans
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={() => onPageChange("settings")}
                        >
                            <FontAwesomeIcon icon={faGear} className="h-8 w-8"/>
                            Settings
                            
                        </motion.button>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            exit={{ scale: 0, opacity: 0 }} 
                            className={`flex w-auto max-h-10 flex-row items-center gap-3 transition duration-300 ease-in-out`}
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="h-8 w-8"/>
                            Log Out
                        </motion.button>
                        
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default Navbar;