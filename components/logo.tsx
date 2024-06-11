import { DiamondPercent } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <DiamondPercent className="h-11 w-11 text-emerald-500" />
      <p className="bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTracker
      </p>
    </Link>
  );
};

export const LogoMobile = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTracker
      </p>
    </Link>
  );
};
