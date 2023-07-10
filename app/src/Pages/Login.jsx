import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("api/users/login", {
        email,
        password,
      });
      if (data.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        console.log("Login successful:", data.user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid credentials");
    }
  };
  return (
  
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">   
        <img className="w-auto h-10 mx-auto"
            src={'./src/assets/user.png'}
            alt="Your Company"
           />
           <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">           Login Panel
           </h2>
        </div>

         <div className="p-6 mt-10 rounded-md shadow-2xl bg-slate-900 sm:mx-auto sm:w-full sm:max-w-sm w-96">
           <form className="space-y-6" action="#" method="POST"  onSubmit={handleLogin}>
              <div>
                <label htmlFor="Username" className="block text-sm font-medium leading-6 text-gray-100">
               Email
              </label>
               <div className="mt-2">
                <input
                 name="email"
                    type="email"
                    autoComplete="email"
                  required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
               </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                   Password
                 </label>
                 <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                     Forgot password?
                    </a>
                 </div>
                </div>
                <div className="mt-2">
                  <input
                  id="password"
                   name="password"
                    type="password"
                   autoComplete="current-password"
                   required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

             <div>
              <button
                  type="submit"
                 className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                 Login
               </button>
             </div>
          </form>
           {errorMessage && <p className="errorMessage">{errorMessage}</p>}
         <p className="mt-10 text-sm text-center text-gray-500">
             Not a member?{' '}
             <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
           </p>
         </div>
     </div>
   
    )
 }

//        <div className="container">
//       <h2 className="heading">Login</h2>
//     <form className="form" onSubmit={handleLogin}>
//      <div className="formGroup">
//             <label className="label">Email</label>
//           <input
//             type="email"
//               value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input"
//          />
//        </div>
//           <div className="formGroup">
//             <label className="label">Password</label>
//          <input
//              type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//               className="input"
//             />
//         </div>
//         <button type="submit" className="button">
//          Login
//            </button>
//         </form>
//    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
//       </div> 

//  )
//  }

export default Login