import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Map />
      <div className="flex-1 p-4 select-none">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div
            className=" w-[90px]  rounded-full"
            style={{ width: "100px", borderRadius: "100%", overflow: "hidden" }}
          >
            <LogoImage src="/imgs/rider.png" alt="logo" />
          </div>
          <div className="flex w-full justify-between sm:justify-end ">
            <div className="w-50 mr-2 text-sm flex nowrap font-bold mt-3 uppercase">
              {user && user.name}
            </div>
            <UserImageContainer  onClick={() => signOut(auth)}>
              {user?.photoUrl.length>1?
              <UserImage
                src={user && user.photoUrl}
              ></UserImage>:
              <UserImage
                src="/imgs/profile.png"
              ></UserImage>
              }
              <UserLogOut>Log Out</UserLogOut>
            </UserImageContainer>
          </div>
        </div>
        <div className=" mobile flex">
          <Link href="/search">
            <div className="h-32 bg-green-200 m-1 flex-1 flex flex-col items-center rounded-lg justify-center text-xl font-medium cursor-pointer">
              <ActionButtonImage src="/imgs/car.png" />
              Ride
            </div>
          </Link>
          <Link href="/search">
            <div className="h-32 bg-gray-200 m-1 flex-1 flex flex-col items-center rounded-lg justify-center text-xl font-medium cursor-pointer">
              <ActionButtonImage src="/imgs/package.png" />
              Package
            </div>
          </Link>
          <Link href="/search">
            <div className="h-32 bg-gray-200 m-1 flex-1 flex flex-col items-center rounded-lg justify-center text-xl font-medium cursor-pointer">
              <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </div>
          </Link>
        </div>
        <Link href="/search">
          <InputButton>Where to?</InputButton>
        </Link>
      </div>
    </div>
  );
}

const UserImage = tw.img`
h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`;

const ActionButtonImage = tw.img`
h-3/5 mobileImage
`;

const InputButton = tw.div`
  h-15 bg-gray-200 text-2xl p-4 flex items-center mt-8 cursor-text
`;

const UserImageContainer = tw.button`
  none opacity-none hover:flex ease-in-out cursor-pointer
`;

const UserLogOut = tw.p`
  text-sm text-gray-500 none hover:text-black
`;
const LogoImage = tw.img`
h-full w-full rounded-full
`;
