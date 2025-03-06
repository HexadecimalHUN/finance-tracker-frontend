import React, {useState, useEffect} from "react"
import { useAuth } from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPen, faKey, faAt} from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion";
import UsernameModal from "./settings/UsernameModal";
import PasswordModal from "./settings/PasswordModal";
import EmailModal from "./settings/EmailModal";
import SuccessModal from "./settings/SuccessModal";
import ErrorModal from "./settings/ErrorModal";

interface UserSettings {
    username: string;
    email: string;
}



export default function Settings(){
    
    //User auth part
    const [userData, setUserData] = useState<UserSettings>({
        username: '',
        email: ''
    })

    const isAuthenticated = useAuth(); 
    const [activeModal, setActiveModal] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');



    useEffect(()=>{
        async function fetchUserData(){
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // If token is missing, the user should be redirected to login
                    console.log("No token found");
                    return;
                  }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/populate`,{
                    method: 'GET',
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data = await response.json();


                setUserData(data);
            }catch(error){
                console.log("Error fetching user data:", error);
            }
        }
        fetchUserData();
    },[]);

    if(!isAuthenticated){
        return(
            <div className="w-full h-screen flex bg-black justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }

    const handleSaveUsername = async (newUsername: string) => {
        // Logic to save username
        await updateUserData("username", newUsername);
      };
    
      const handleSaveEmail = async (newEmail: string) => {
        // Logic to save email
        await updateUserData("email", newEmail);
      };
    
      const handleSavePassword = async (newPassword: string, currentPassword: string) => {
        // Logic to save password
        await updateUserData("password", { newPassword, currentPassword });
      };




    const updateUserData = async (field: string, value: any) => {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
    
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/${field}`;
        let body = {};
    
        switch (field) {
          case "username":
            body = { newUsername: value };
            break;
          case "email":
            body = { newEmail: value };
            break;
          case "password":
            body = { currentPassword: value.currentPassword, newPassword: value.newPassword };
            break;
          default:
            return;
        }
    
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
          });
          if (response.ok) {
            const data = await response.json();
            if (data.newToken) {
                localStorage.setItem("token", data.newToken);
            }
            setUserData((prevState) => ({
                ...prevState,
                [field]: value,
            }));
            setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} successfully updated!`)
            setActiveModal("success");
          } else {
            const errorText = await response.text();
            setErrorMessage(`Error updating ${field}: ${errorText}`);
            setActiveModal("error");
          }
        } catch (error) {
            console.error("Error during API call:", error);
            setErrorMessage(`Error updating ${field}: ${error}`);  
            setActiveModal("error");
        }
    };
    
    

    return (
        <div className="flex w-full h-screen font-serif bg-slate-100">
            <div className="flex w-full h-screen md:ml-20 flex-col divide divide-y-2 divide-solid divide-slate-400">
                <div className="flex text-3xl p-4 text-slate-700 w-full h-auto">Profile Settings</div>
                <div className="flex divide divide-y divide-y-1 divide-solid divide-slate-400 w-full h-auto flex-col">
                    <div className="flex flex-col w-full h-auto">
                        <div className="flex text-md p-4 pl-12 font-bold text-themePurple">Username And Password</div>
                        {/* Username Change */}
                        <motion.button
                            whileHover={{ scaleX: 0.98 }}
                            whileTap={{ scaleX: 0.95 }}
                            onClick={() => setActiveModal("username")}
                            className="flex flex-row pl-12 items-center hover:bg-themePurple/20 transition duration-300 ease-in-out group"
                        >
                            <div className="flex h-12 w-12 justify-center items-center">
                                <FontAwesomeIcon icon={faUserPen} className="h-8 w-8 text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group" />
                            </div>
                            <div className="flex flex-col p-2 items-start">
                                <div className="text-2xl text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group">Change Username</div>
                                <div className="text-lg text-slate-500 group-hover:text-themePurple transition duration-300 ease-in-out group">{userData.username}</div>
                            </div>
                        </motion.button>
                        {/* Password Change */}
                        <motion.button
                            whileHover={{ scaleX: 0.98 }}
                            whileTap={{ scaleX: 0.95 }}
                            onClick={() => setActiveModal("password")}
                            className="flex flex-row pl-12 items-center hover:bg-themePurple/20 transition duration-300 ease-in-out group"
                        >
                            <div className="flex h-12 w-12 justify-center items-center">
                                <FontAwesomeIcon icon={faKey} className="h-8 w-8 text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group" />
                            </div>
                            <div className="flex flex-col p-2 items-start">
                                <div className="text-2xl text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group">Change Password</div>
                                <div className="text-lg text-slate-500 group-hover:text-themePurple transition duration-300 ease-in-out group">*******</div>
                            </div>
                        </motion.button>
                    </div>
                    <div className="flex flex-col w-full h-auto">
                        <div className="flex text-md p-4 pl-12 font-bold text-themePurple">Email Address</div>
                        {/* Email Change */}
                        <motion.button
                            whileHover={{ scaleX: 0.98 }}
                            whileTap={{ scaleX: 0.95 }}
                            onClick={() => setActiveModal("email")}
                            className="flex flex-row pl-12 items-center hover:bg-themePurple/20 transition duration-300 ease-in-out group"
                        >
                            <div className="flex h-12 w-12 justify-center items-center">
                                <FontAwesomeIcon icon={faAt} className="h-8 w-8 text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group" />
                            </div>
                            <div className="flex flex-col p-2 items-start">
                                <div className="text-2xl text-slate-600 group-hover:text-themePurple transition duration-300 ease-in-out group">Change Email</div>
                                <div className="text-lg text-slate-500 group-hover:text-themePurple transition duration-300 ease-in-out group">{userData.email}</div>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
    
          {/* Modals */}
          <UsernameModal
            isActive={activeModal === "username"}
            closeModal={() => setActiveModal("")}
            onSaveUsername={handleSaveUsername}
            currentUsername={userData.username}
          />
          <PasswordModal
            isActive={activeModal === "password"}
            closeModal={() => setActiveModal("")}
            onSavePassword={handleSavePassword}
          />
          <EmailModal
            isActive={activeModal === "email"}
            closeModal={() => setActiveModal("")}
            onSaveEmail={handleSaveEmail}
            currentEmail={userData.email}
          />
        <SuccessModal 
            isActive={activeModal === "success"} 
            closeModal={() => setActiveModal("")} 
            message={successMessage} 
        />

        <ErrorModal isActive={activeModal === "error"}
            closeModal={() => setActiveModal("")} 
            errorMessage={errorMessage} 
        />
    </div>
    );

}