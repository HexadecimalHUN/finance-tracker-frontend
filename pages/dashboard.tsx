import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "../components/Navbar"
import Limits from "@/components/Limits";
import NewExpense from "@/components/NewExpense";
import Plans from "@/components/Plans";
import Savings from "@/components/Savings";
import Settings from "@/components/Settings";
import SummaryPage from "@/components/SummaryPage";
import ViewExpenses from "@/components/ViewExpenses";


export default function Dashboard(){
    const [currentPage, setCurrentPage] = useState("")
    const isAuthenticated = useAuth();

   

    if(!isAuthenticated){
        return(
            <div className="w-full h-screen flex bg-black justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }

    const handlePageChange = (page:string) =>{
        setCurrentPage(page)
    }

    const renderContent = () =>{
        switch(currentPage){
            case "limits":
                return<Limits/>;
            case "new-expense":
                return<NewExpense/>
            case  "plans":
                return<Plans/>
            case "savings":
                return<Savings/>
            case "settings":
                return<Settings/>
            case "summary-page":
                return<SummaryPage/>
            case "view-expenses":
                return<ViewExpenses/>
            default:
                return<SummaryPage/>
        };
    };

    return(
        <div className="flex w-full h-screen select-none">
            <Navbar onPageChange={handlePageChange}></Navbar>
            <div className="flex w-full h-screen">
                {renderContent()}
            </div>
        </div>
    )

}