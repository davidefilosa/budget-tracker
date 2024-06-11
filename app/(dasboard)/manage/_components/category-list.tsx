"use client";

import { SkeletonWrapper } from "@/components/skeleton-wrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { DiamondPlus, TrendingDown, TrendingUp } from "lucide-react";
import { CreateCategoryDialog } from "../../_components/create-category-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CategoryCard } from "./category-card";
import { Category } from "@prisma/client";

export const CategoryList = ({ type }: { type: TransactionType }) => {
  const categoryQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoryQuery.data && categoryQuery.data.length > 0;
  return (
    <SkeletonWrapper isLoading={categoryQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-rose-400/10 text-rose-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 text-emerald-500" />
              )}
            </div>
            {type === "expense" ? "Expences" : "Incomes"} categories
            <div className="text-sm text-muted-foreground">Sorted by name</div>
            <CreateCategoryDialog
              type={type}
              successCallback={() => categoryQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <DiamondPlus className="h-4 w-4" /> Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No{" "}
              <span
                className={cn(
                  "m-1",
                  type === "income" ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {type}
              </span>
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
};
