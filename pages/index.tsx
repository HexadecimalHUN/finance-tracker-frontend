import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/auth/LoginComponent";
import RegisterForm from "../components/auth/RegisterComponent";
import { motion } from "framer-motion";

export default function Home() {
  const [isCreateNewModalOpen, setIsCreateNewModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        router.push("/dashboard")
    }
    else{
        console.log("Token not present")
    }
  })

  const openCreateNewModal = () => {
    if (!isCreateNewModalOpen && !isLoginModalOpen) {
      setIsCreateNewModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsCreateNewModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const openLoginModal = () => {
    if (!isCreateNewModalOpen && !isLoginModalOpen) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-themePurple to-themeDarkBlue1 flex-col items-center font-serif">
      {/* General Error Box */}
      {showError && (isCreateNewModalOpen || isLoginModalOpen) && (
        <div className="fixed top-0 h-6 bg-red-500 w-screen flex justify-center z-20 text-slate-100 transition duration-500 ease-in-out">
          {generalError}
        </div>
      )}

      {/* Page Content */}
      <div className="flex sm:w-screen lg:max-w-90r min-h-screen flex-col pr-10 pl-10">
        <div className="flex lg:mt-12 mt-8 justify-center justify-between">
          <div className="flex max-w-14 lg:max-w-20">
            <Image src="/logo.svg" alt="Finance Tracker Logo" width={100} height={100} className="w-full h-full" />
          </div>
          <motion.button
            whileHover={{scale:1.1}}
            whileTap= {{scale:0.9}}
            transition={{duration:0.1}}
            className="h-16 text-center justify-center items-center flex rounded-full border-solid border-2 border-themeLightBlue1 p-4 text-3xl text-themeLightBlue1 hover:text-themeLightBlue2 hover:border-themeLightBlue2 transition duration-300 ease-in-out font-medium"
            onClick={openLoginModal}
          >
            Log In
          </motion.button>
        </div>

        <div className="flex flex-col justify-star items-start mt-10 gap-10">
          <h1 className="text-8xl text-slate-200">Expense Tracker</h1>
          <h2 className="text-5xl text-slate-200">Smart • Safe • Simple</h2>
          <motion.button
            whileHover={{scale:1.1}}
            whileTap= {{scale:0.9}}
            transition={{duration:0.1}}
            className="flex rounded-full p-4 bg-themeLightBlue1 text-3xl text-violet-950 font-medium hover:bg-themeLightBlue2 transition duration-500 ease-in-out"
            onClick={openCreateNewModal}
          >
            Register Now
          </motion.button>
        </div>
      </div>

      {/* Create New User Modal */}
      {isCreateNewModalOpen && (
        <RegisterForm
          closeModal={closeModal}
          setGeneralError={setGeneralError}
          showError={showError}
          setShowError={setShowError}
        />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginForm
          closeModal={closeModal}
          setGeneralError={setGeneralError}
          showError={showError}
          setShowError={setShowError}
        />
      )}
    </div>
  );
}