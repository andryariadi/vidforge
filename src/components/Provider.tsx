"use client";

import { db } from "@/db/config-db";
import { Users } from "@/db/schema";
import { toastStyle } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      isNewUser(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const isNewUser = async (email: string) => {
    try {
      const res = await db.select().from(Users).where(eq(Users.email, email));

      if (!res[0]) {
        await db.insert(Users).values({
          name: user?.fullName as string,
          email: email,
          imageUrl: user?.imageUrl,
        });
      } else {
        toast.success("Welcome back " + user?.fullName, { style: toastStyle });
      }

      console.log({ res }, "<---diprovider2");
    } catch (error) {
      console.error(error, "<---diisNewUser error");
    }
  };

  console.log({ user }, "<---diprovider");

  return <div>{children}</div>;
};

export default Provider;
