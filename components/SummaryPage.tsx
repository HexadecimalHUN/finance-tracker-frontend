
import { useState, useEffect } from "react";

export default function SummaryPage(){
    const [monthlyCapturedTransactions, setMonthlyCapturedTransactions] = useState<number>(0);
    const [previousMonthCapturedTransactions, setPreviousMonthCapturedTransactions] = useState<number>(0);
    const [monthlyChange, setMonthlyChange] = useState<string>("0%");
    const [monthlyMoneySpent, setMonthlyMoneySpent] = useState<number>(0);
    const [previousMonthMoneySpent, setPreviousMonthMoneySpent] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("USD");
    const [moneySpentChange, setMoneySpentChange] = useState<string>("0%")

    const [monthlyLimitState, setMonthlyLimitState] = useState<string>('Below');
    const [monthlyLimitNumber, setMonthlyLimitNumber] = useState<number>(0);
    
    useEffect(() => {
        async function fetchMonthlyTransactions(){
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found for fetching monthly data");
                    return;
                }

                //Get Current month
                const today = new Date();
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = today;

                //Get Previous month

                const startOfPreviousMonth = new Date(today.getFullYear(), today.getMonth()-1, 1);
                const endOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0)

                //Formatting Dates 
                const formatDate = (date: Date) => date.toISOString().split("T")[0];

                const fetchMethod = {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }
                }



                const urlCurrentMonth = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/date-range?startDate=${formatDate(startOfMonth)}&endDate=${formatDate(endOfMonth)}`;
                const urlPreviousMonth = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/date-range?startDate=${formatDate(startOfPreviousMonth)}&endDate=${formatDate(endOfPreviousMonth)}`;
                const urlSettings = `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/populate`;

                //Fetching Current Month
                const responseCurrentMonth = await fetch(urlCurrentMonth, fetchMethod);
                
                if(responseCurrentMonth.ok){
                    const data = await responseCurrentMonth.json();
                    console.log("Monthly transactions: " + JSON.stringify(data));
                    setMonthlyCapturedTransactions(data.length);

                    const spentCurrentMonth = data.reduce((sum: number, transaction: {amount: number}) => sum + transaction.amount, 0);
                    setMonthlyMoneySpent(spentCurrentMonth);

                } else{
                    console.error("Failed to fetch monthly transactions: ", responseCurrentMonth.statusText);
                }

                //Fetching previous month
                const responsePreviousMonth = await fetch(urlPreviousMonth,fetchMethod);
                if(responsePreviousMonth.ok){
                    const data = await responsePreviousMonth.json();
                    console.log("Previous month transactions: " + JSON.stringify(data));
                    setPreviousMonthCapturedTransactions(data.length);
                    const spentPreviousMonth = data.reduce((sum: number, transaction: {amount: number})=> sum + transaction.amount, 0);
                    setPreviousMonthMoneySpent(spentPreviousMonth);
                }

                //Fetch User Primary Currency
                const responseSettings = await fetch(urlSettings, fetchMethod);
                if (responseSettings.ok){
                    const userSettings = await responseSettings.json();
                    setCurrency(userSettings.primaryCurrency || "USD");
                }{
                    console.error("Failed to fetch user settings: ", responseSettings.statusText);
                }


            }catch(error){
                console.error("Error fetching monthly transactions: ", error)
            }
        };
        fetchMonthlyTransactions();
    }, []);

    //Calculating percentage changes whenever transaction counts are updated
    useEffect(()=>{
        if (previousMonthCapturedTransactions === 0){
            setMonthlyChange("+100%");
        } else{
            const change = ((monthlyCapturedTransactions - previousMonthCapturedTransactions) / previousMonthCapturedTransactions) *100;
            setMonthlyChange(`${change >= 0 ? '+' : ''}${change.toFixed(0)}%`);

        }
    },[monthlyCapturedTransactions, previousMonthCapturedTransactions])

    //Calculate percentage change in money spent
    useEffect(()=>{
        if(previousMonthMoneySpent === 0){
            setMoneySpentChange("+100%");
        } else{
            const change = ((monthlyMoneySpent - previousMonthMoneySpent) / previousMonthMoneySpent) *100;
            setMoneySpentChange(`${change >= 0 ? '+' : ''}${change.toFixed(0)}%`);
        }
    },[monthlyMoneySpent, previousMonthMoneySpent])


    return(
        <div className="flex bg-slate-100 w-full h-screen font-serif">
            <div className="flex w-full h-screen md:ml-20 flex-col divide divide-y-2 divide-solid divide-slate-400">
                <div className="flex p-4 flex-col gap-1">
                    <div className="text-slate-700 text-3xl w-full h-auto">Dashboard</div>
                    <div className="text-themePurple/70 text-xl font-bold w-full h-auto">Analyze your monthly performance</div>
                </div>
                <div className="flex md:flex-row flex-col w-full h-auto p-10 gap-10 justify-around">
                    <div className=" flex  flex-col w-full md:w-80 bg-white h-auto p-2 shadow-lg shadow-slate-400 rounded-md gap-4" >
                        <div className="text-2xl font-semibold text-themePurple/90">Transactions captured</div>
                        <div className="flex flex-row justify-between pr-2 pl-2 items-end">
                            <div className="text-3xl font-semibold text-themePurple">{monthlyCapturedTransactions}</div>
                            <div className="text-md font-semibold text-themePurple/70">{monthlyChange}</div>
                        </div>

                    </div>
                    <div className="flex  flex-col w-full md:w-80 bg-white h-auto p-2 shadow-lg shadow-slate-400 rounded-md gap-4" >
                        <div className="text-2xl font-semibold text-themePurple/90">Money Spent</div>
                        <div className="flex flex-row justify-between pr-2 pl-2 items-end">
                            <div className="flex flex-row items-end gap-2">
                                <div className="text-3xl font-semibold text-themePurple">{monthlyMoneySpent}  </div>
                                <div className="text-xl font-semibold text-themePurple">{currency}</div>
                            </div>
                            <div className="text-md font-semibold text-themePurple/70">{moneySpentChange}</div>
                        </div>

                    </div>
                    <div className="w-full md:w-80 bg-white h-auto p-2 shadow-lg shadow-slate-400 rounded-md" >
                        <div className="">{monthlyLimitState} monthly limit</div>
                        <div className="">{monthlyLimitNumber}</div>

                    </div>
                </div>
            </div>
        </div>
    )
}