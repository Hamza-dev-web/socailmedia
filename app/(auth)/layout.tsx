import type { Metadata } from "next";
import "../globals.css";
import { currentUser } from "@clerk/nextjs/server";
import { CreateUsers } from "@/lib/action/user.action";

export  default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user =await currentUser()
console.log(user)
  if(user){
   await CreateUsers({
        username: user.username as string,
        email: user.emailAddresses[0].emailAddress as string,
        image: user.imageUrl as string,
      }) 
  } 
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
