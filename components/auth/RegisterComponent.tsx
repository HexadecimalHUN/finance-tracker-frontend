/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";


interface RegisterFormProps {
  closeModal: () => void;
  setGeneralError: (error: string) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RegisterForm({ closeModal, setGeneralError, showError, setShowError }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    

    e.preventDefault();
    let valid = true;

    // Reset Errors
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setGeneralError("");

    if (!username) {
      setUsernameError(true);
      setGeneralError("Username is required");
      valid = false;
    }

    // Email validation
    if (!email) {
      setEmailError(true);
      setGeneralError("Email is required");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError(true);
      setGeneralError("Invalid email address");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError(true);
      setGeneralError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(true);
      setGeneralError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) {
        setShowError(true);
        setTimeout(() => setShowError(false), 10000);
      } else {
        setShowError(false);
  
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
  
          if (response.ok) {
            const data = await response.json();
            //Store token in local storage
            localStorage.setItem("token", data.token)
            router.push("/dashboard")


          } else {
            const errorData = await response.json();
            setGeneralError(errorData.error || "Registration failed");
            setShowError(true);
          }
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Handle the error if it is an instance of the Error object
                setGeneralError("Registration error: " + error.message);
              } else {
                // Handle unknown types of errors
                setGeneralError("An unknown error occurred.");
              }
              setShowError(true);
        }
      }
  };

  return (
    <div className="fixed flex flex-col w-full h-screen bg-black/60 backdrop-blur-xl items-center z-10">
      <div className="flex w-screen h-screen lg:h-auto lg:max-w-35r bg-white h-auto items-center lg:mt-20 sm:mt-0 lg:rounded-lg p-2 flex-col justify-center lg:justify-start">
        <h1 className="text-4xl text-themePurple mt-4 mb-4">Create a profile</h1>
        <form onSubmit={handleRegister} className="flex flex-col space-y-3 lg:max-w-30r sm-w-screen items-center">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className={`p-1 text-xl border-2 border-solid rounded-full lg:w-30r text-center ${usernameError ? "border-red-500" : "border-themePurple/40"}`}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`p-1 text-xl border-2 border-solid rounded-full lg:w-30r text-center ${passwordError ? "border-red-500" : "border-themePurple/40"}`}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={`p-1 text-xl border-2 border-solid rounded-full lg:w-30r text-center ${emailError ? "border-red-500" : "border-themePurple/40"}`}
          />
          <button type="submit" className="text-2xl bg-gradient-to-br from-themePurple to-genericPurpleGradient1 text-white p-2 rounded-full w-40 hover:bg-fuchsia-900 transition duration-300 ease-in-out">
            Register
          </button>
        </form>
        {/* Or Section */}
        <div className="flex items-center justify-center space-x-4 mt-3 mb-3">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

        {/* Social Buttons */}
        <div className="flex flex-row flex-col space-y-2">
            <button className="text-xl bg-gradient-to-br from-themePurple to-genericPurpleGradient1 text-white p-3 rounded-full flex items-center justify-center space-x-2 gap-3 hover:bg-fuchsia-900 transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
            <span>Register with Google</span>
            </button>
            <button className="text-xl bg-gradient-to-br from-themePurple to-genericPurpleGradient1 text-white p-3 rounded-full flex items-center justify-center space-x-2 gap-3 hover:bg-fuchsia-900 transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            <span>Register with GitHub</span>
            </button>
        </div>
        {/* Close Button */}
        <button onClick={closeModal} className="mt-4 text-xl font-bold text-gray-600">Close</button>
      </div>
    </div>
  );
}