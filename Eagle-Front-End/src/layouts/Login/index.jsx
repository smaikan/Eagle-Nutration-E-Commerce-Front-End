import React, { useEffect, useState } from "react";
import Log from "./log";
import Signup from "./Signup";

const Login = () => {
  const [wLogin,Setlogin] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" mt-8 flex justify-center px-0">

      {wLogin ? <Log setlogin={Setlogin} /> : <Signup setlogin={Setlogin}/>}

      

    </div>
  );
};

export default Login;
