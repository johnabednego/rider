import { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-white w-full justify-center items-center p-4 overflow-x-hidden select-none">
      <div
        className=" w-[90px]  rounded-full"
        style={{ width: "100px", borderRadius: "100%", overflow: "hidden" }}
      >
        <LogoImage src="/imgs/rider.png" alt="logo" />  
      </div>
      <div className=" text-center text-3xl sm:text-5xl pt-3 pl-5 text-gray-500">
        Login to access your account
      </div> 
      <LoginImage
        src="https://i.ibb.co/CsV9RYZ/login-image.png"
        alt="Svg image"
        className=" sm:w-1/2 "
      />
      <div
        onClick={() => signInWithPopup(auth, provider)}
        className=" bg-blue-500 text-white text-center py-4 px-8 mt-8 self-center w-fit cursor-pointer select-none sm:text-xl flex justify-center align-center rounded-lg"
      >
        <div className="text-white text-center cursor-pointer select-none sm:text-xl flex justify-center align-center flex-1 items-center">
          <GoogleSvg
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/google-btn-logo-389b92241b.svg"
            alt=""
          />
          CONTINUE WITH GOOGLE
        </div>
      </div>

      {/* <div className=" text-center flex text-small text-black justify-center mt-3 select-none">
        Don&apos;t have an account?
        <a
          href="/signup"
          className="text-small text-blue-600 ml-2 cursor-pointer"
        >
          Sign up
        </a>
      </div> */}
    </div>
  );
};

export default Login;

const LoginImage = tw.img`
   object-contain select-none
`;

const GoogleSvg = tw.img`
    justify-center mr-2
`;

const LogoImage = tw.img`
h-full w-full rounded-full mb-8
`;