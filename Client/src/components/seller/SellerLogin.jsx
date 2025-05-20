import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div
          className=" flex flex-col gap-5 m-auto  items-start p-8 py-12 min-w-80 sm:min-w-88
             rounded-lg shadow-xl border border-gray-200"
        >
          <p className="text-2xl font-medium m-auto">
            {" "}
            <span className="text-primary">seller</span>login
          </p>
          <div className=" w-full">
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="example@demo.com"
              className="border border-gray-200 rouded w-full p-2 mt-1 outline-primary"
              required
            />
          </div> 
          <div className=" w-full">
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="#ABcD@707"
              className="border border-gray-200 rouded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <button className="bg-primary hover:bg-primary-dull text-white py-2 rounded-md cursor-pointer w-full">
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
