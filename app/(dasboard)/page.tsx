import { Button } from "@/components/ui/button";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { DiamondMinus, DiamondPlus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { CreateTransactionDialog } from "./_components/create-transaction-dialog";
import { Overview } from "./_components/overview";
import { History } from "./_components/history";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prismadb.userSettings.findUnique({
    where: { userId: user.id },
  });

  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}!</p>
          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              triggres={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white "
                >
                  <div className="flex gap-2 items-center">
                    New Income <DiamondPlus className="w-6 h-6" />
                  </div>
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              triggres={
                <Button
                  variant={"outline"}
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white "
                >
                  <div className="flex gap-2 items-center">
                    New Expense <DiamondMinus className="w-6 h-6" />
                  </div>
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
};

export default DashboardPage;
