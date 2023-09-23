import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserProvider";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
// import { signInUser } from "../../api/api";
import { UserTypes } from "../../configs/Constants/ActionTypes";
import { handleUserLogin } from "../../util/utilFunctions";

const Login = () => {

 const navigate = useNavigate();
 const [{ user }, userDispatch] = useUserContext();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const EmailAuth = () => {
    if (!user) {
      if (email.length > 0 && password.length > 0) {
        toast.promise(
          // signInUser({email, password}),
          {
            pending: "Signing in...",
            success: "Signin successful: WELCOME!",
            error: "Error signing account, Please try again🤗",
          }
        ).then((userData) => {
          handleUserLogin(userData[0],userDispatch);
          navigate("/");
        }
        ).catch((error) => {
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
    <section className="w-full h-auto ">
    <div className="container h-full md:py-10">
      <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-3">
        {/* <ImageBox /> */}
        <div className="w-full md:w-[30rem]">
        <div className="flex items-center justify-center w-full my-10">
                <p className={`text-2xl text-headingColor font-semi-bold capitalize relative before:absolute before:rounded before:content before:w-[100%] before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100`}>
            Sign In
                </p>
            </div>
          <form className="p-2">
            {/* <ProviderAuth /> */}
            {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="mx-4 mb-0 text-sm font-semibold text-center text-textColor">
                OR
              </p>
            </div> */}
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

            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="text-orange-600 transition duration-200 ease-in-out hover:text-orange-700 focus:text-orange-700 active:text-orange-800"
              >
                Forgot password?
              </Link>
            </div>

            <motion.p
              className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md cursor-pointer px-7 bg-gradient-to-br from-orange-400 to-orange-500 hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              onClick={EmailAuth}
              whileHover={{ scale: 1.1 }}
            >
              Sign in
            </motion.p>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="mx-4 mb-0 text-sm font-semibold text-center text-textColor">
                Don&apos;t have an account?
              </p>
            </div>
            <Link to={"/register"}>
              <motion.p
                whileHover={{ scale: 0.99 }}
                className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md cursor-pointer px-7 bg-gradient-to-br from-orange-400 to-orange-500 hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                Sign Up
              </motion.p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login