import React from "react";
import prismadb from "@/lib/prismadb";
import PersonaForm from "./components/persona-form";

interface PersonaIdPageProps {
  params: {
    personaId: string;
  };
}

export default async function PersonaPageId({ params }: PersonaIdPageProps) {
  // check subscription

  const persona = await prismadb.persona.findUnique({
    where: {
      id: params.personaId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <PersonaForm initialData={persona} categories={categories} />;
}
