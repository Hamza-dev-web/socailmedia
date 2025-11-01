import { SignIn, SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className=" w-screen flex min-h-screen justify-center items-center">
    <SignIn />
  </div>;
}