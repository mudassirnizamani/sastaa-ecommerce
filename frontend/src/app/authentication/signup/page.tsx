"use client";

import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const { loading, signup } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#FAFAFA] grid place-content-center">
      <div className="bg-white p-[3rem] rounded-[.75rem] w-[380px] md:w-[528px] shadow-lg">
        <header className="flex items-center justify-between">
          <p className="text-[2rem] font-semibold">Sign up</p>
          <p className="text-[1.6rem] ">
            Have an account?{" "}
            <Link href="/authentication/signin" className="font-semibold">
              Sign in
            </Link>
          </p>
        </header>
        <div className="mt-[5rem]">
          <label
            className="text-[1.6rem] text-[#18181B] font-[400]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            value={email}
          />
          <label
            className="text-[1.6rem] text-[#18181B] font-[400]"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.currentTarget.value)
            }
            value={phoneNumber}
          />
          <label
            className="text-[1.6rem] text-[#18181B] font-[400]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border-[1px] border-[#A1A1AA] h-[5.8rem] rounded-[1.1rem] my-4 text-[1.5rem] p-4"
            type="password"
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
          />
          <button
            onClick={() => signup(email, password, phoneNumber)}
            className="mt-8 text-[1.7rem] bg-[#18181B] w-full p-[1.8rem] text-white rounded-[1.3rem]"
          >
            {loading ? <Spinner size={20} /> : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
