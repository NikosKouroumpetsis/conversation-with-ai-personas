import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import ChatClient from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const persona = await prismadb.persona.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!persona) {
    return redirect("/");
  }

  return <ChatClient persona={persona} />;
}

export default ChatIdPage;
