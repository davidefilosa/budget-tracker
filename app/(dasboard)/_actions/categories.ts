"use server";

import { prismadb } from "@/lib/prismadb";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/schema/category";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parseBody = CreateCategorySchema.safeParse(form);

  if (!parseBody.success) {
    throw new Error("Bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { name, icon, type } = parseBody.data;

  return await prismadb.category.create({
    data: { userId: user.id, name, icon, type },
  });
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parseBody = DeleteCategorySchema.safeParse(form);

  if (!parseBody.success) {
    throw new Error("Bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { name, type } = parseBody.data;

  return await prismadb.category.delete({
    where: { name_userId_type: { userId: user.id, name, type } },
  });
}
