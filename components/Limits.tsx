import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

type Category = {
    id: number;
    amount: number;
    title: string;
    description: string;
}


export default function Limits(){
    const [predefinedCategories, setPredefinedCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchPredefinedCategories(){
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    // If token is missing, the user should be redirected to login
                    console.log("No token found");
                    return;
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/predefined-limits`,{
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data : Category[] = await response.json();

                setPredefinedCategories(data);
                console.log(JSON.stringify(predefinedCategories));
            }
            catch(error){
                console.error(error);
            }
        }

        async function fetchUserActiveLimits(){

        }

        fetchPredefinedCategories();
    }, []);

    return (
        <div className="flex w-full h-screen font-serif bg-slate-100">
            <div className="flex md:ml-20 w-full h-screen flex-col divide divide-y-2 divide-solid divide-slate-400">
                <div className="flex p-4 w-full h-auto flex-col gap-2">
                    <div className="flex text-3xl  text-slate-700 ">Monthly Limit</div>
                    <div className="flex text-xl text-slate-700 font-medium">Setup a limit that helps to control your
                        monthly spending!
                    </div>
                </div>
                <div className="flex gap-8 p-10 flex-col">
                    <div className="text-themePurple/70 text-2xl font-bold">Use a limit preset</div>
                    <div className="flex w-full flex-col md:flex-row h-auto gap-8 items-start">
                        {predefinedCategories.map(category => (
                            <motion.div
                                onClick={() => {}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={category.id}
                                className="flex w-full md:max-w-30r md:w-auto flex-col rounded-lg shadow-xl shadow-slate-300 bg-white">
                                <div className="flex p-4 justify-center items-center bg-gradient-to-r from-genericPurpleGradient1 to-genericPurpleGradient2 text-slate-100 text-2xl rounded font-semibold gap-10">
                                    {category.title}
                                    <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-white/20 justify-center items-center"/>
                                </div>
                                <div className="lex p-6 text-lg justify-center items-center text-slate-700">{category.description}</div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-themePurple/70 text-2xl font-bold">or assign your own limit</div>
                    <motion.div
                        onClick={()=>{}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{scale: 0.95 }}
                        className="flex flex-col w-full md:max-w-30r h-auto bg-white rounded-lg shadow-xl shadow-slate-300">
                        <div className="flex p-4 justify-center items-center bg-gradient-to-r from-genericPurpleGradient1 to-genericPurpleGradient2 text-slate-100 text-2xl rounded font-semibold gap-10">
                            Custom Limit
                            <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-white justify-center items-center"/>
                        </div>
                        <div className="lex p-6 text-lg justify-center items-center text-slate-700">Set your own limit according your needs and preferences</div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}