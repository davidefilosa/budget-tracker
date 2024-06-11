import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const paramType = searchParams.get("type");

  const validator = z.enum(["expense", "income"]).nullable();

  const queryParam = validator.safeParse(paramType);

  if (queryParam.success === false) {
    return Response.json(queryParam.error, { status: 400 });
  }

  const type = queryParam.data;

  let categories = await prismadb.category.findMany({
    where: { userId: user.id, ...(type && { type }) },
    orderBy: { name: "asc" }, // filter by type only if type is defined
  });

  return Response.json(categories);
}
