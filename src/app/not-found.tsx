'use client'

import { Button } from "@/components/ui/button";
import {CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid h-[70vh] place-items-center bg-background p-4">
      <div className="w-full max-w-full space-y-4 flex flex-col items-center justify-center">
        <CardHeader className="space-y-2 w-full max-w-full ">
          <CardTitle className="text-center text-2xl font-bold">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </CardContent>
        <CardFooter>
          <Button variant='blue' asChild className="w-full">
            
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </div>
    </main>
  );
}
