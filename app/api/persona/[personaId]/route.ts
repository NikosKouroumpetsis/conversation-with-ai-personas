import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { personaId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instruction, seed, categoryId } = body;

    if (!params.personaId) {
      return new NextResponse("Persona ID is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instruction || !seed || !categoryId) {
      return new NextResponse("Missing requiers fields", { status: 400 });
    }

    // Check for subscription

    const persona = await prismadb.persona.update({
      where: {
        id: params.personaId,
      },
      data: {
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        categoryId,
        description,
        instruction,
        seed,
      },
    });

    return NextResponse.json(persona);
  } catch (error) {
    console.log("[COMPANION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
