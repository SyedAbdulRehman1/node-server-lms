import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface ChatData {
  userId: string;
  messages: any[];
  title: string;
}
export class ChatService {
  async getChats(userId: string) {
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return prisma.chat.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async createChatService(chatData: ChatData) {
    const { userId, messages, title } = chatData;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await prisma.chat.create({
      data: {
        title,
        messages,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async updateChatService({
    chatId,
    messagesArray,
  }: {
    chatId: string;
    messagesArray: any[];
  }) {
    if (!chatId) {
      throw new Error("Chat ID is required");
    }

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: { messages: messagesArray },
    });

    return updatedChat;
  }

  async deleteChatService(chatId: string) {
    if (!chatId) {
      throw new Error("Unauthorized");
    }

    return await prisma.chat.delete({
      where: { id: chatId },
    });
  }
}
