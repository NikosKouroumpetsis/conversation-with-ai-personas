import React from "react";
import prismadb from "@/lib/prismadb";
import PersonaForm from "./components/persona-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface PersonaIdPageProps {
  params: {
    personaId: string;
  };
}

export default async function PersonaPageId({ params }: PersonaIdPageProps) {
  // check subscription

  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const persona = await prismadb.persona.findUnique({
    where: {
      id: params.personaId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <PersonaForm initialData={persona} categories={categories} />;
}
