"use server";

import { prismadb } from "@/lib/prismadb";
import { UpdateUserCurrencySchema } from "@/schema/user-settings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateUserCurreny(currency: string) {
  const parseBody = UpdateUserCurrencySchema.safeParse({ currency });

  if (!parseBody.success) {
    throw parseBody.error;
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prismadb.userSettings.update({
    where: { userId: user.id },
    data: { currency },
  });

  return userSettings;
}
