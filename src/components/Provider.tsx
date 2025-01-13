"use client";

import { db } from "@/db/config-db";
import { Users } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    const isNewUser = async (email: string) => {
      try {
        const res = await db.select().from(Users).where(eq(Users.email, email));

        if (!res[0]) {
          await db.insert(Users).values({
            name: user?.fullName as string,
            email: email,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.primaryEmailAddress?.emailAddress) {
      isNewUser(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  return <>{children}</>;
};

export default Provider;
