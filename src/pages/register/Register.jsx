import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext/UserProvider';
// import { signUpUser } from '../../api/api';
import { toast } from "react-toastify";
import { UserTypes } from '../../configs/Constants/ActionTypes';
import { handleUserLogin } from '../../util/utilFunctions';


const Register = () => {

    const navigate = useNavigate();
    const [{ user }, userDispatch] = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const EmailAuth = () => {
        if (!user) {
          if (email.length > 0 && password.length > 0) {
            toast.promise(
            //  signUpUser({email, password}),
              {
                pending: "Creating Account...",
                success: "Signup successful: WELCOME!",
                error: "Error Creating account, Please try again🤗",
              }
            ).then((userCredential) => {
              handleUserLogin(userCredential[0], userDispatch)
              navigate("/");
            }
            ).catch((error) => {
              // const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage, { autoClose: 15000 });
            }
            );
    
          } else {
            toast.warn("Please fill all the fields", { autoClose: 15000 });
          }
        }
      };

  return (
    <section className="w-full h-auto">
      <div className="container h-full md:py-10">
        <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
          <div className="w-full md:w-[30rem]">
            <form className="p-2">
              <div className="mb-6">
                <input
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="block w-full px-4 py-2 m-0 text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between mb-6"></div>

              <p
                className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md cursor-pointer px-7 bg-gradient-to-br from-orange-400 to-orange-500 hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg"
                onClick={EmailAuth}
              >
                Sign Up
              </p>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="mx-4 mb-0 text-sm font-semibold text-center text-textColor">
                  Already have an account?
                </p>
              </div>
              <Link
                to={"/login"}
                className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md px-7 bg-gradient-to-br from-orange-400 to-orange-500 hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register