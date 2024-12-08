import { Request, Response } from "express";
import { ChatService } from "./chat.service";
// import { ChapterService } from "./chapter.service";

const chatService = new ChatService();

export const GetChats = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as any;

  try {
    const Chats = await chatService.getChats(user?.id);
    console.log(Chats, "dfdfd");
    res.status(200).json({ status: "success", data: Chats });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const CreateChat = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;

    const { messages, title } = req.body;

    if (!user) {
      throw "Unauthorized";
    }

    const createdChat = await chatService.createChatService({
      userId: user.id,
      messages,
      title,
    });

    res.status(201).json({
      message: "Chat created successfully",
      chat: createdChat,
    });
  } catch (error: any) {
    console.error("[CREATE_CHAT_ERROR]", error);
    res.status(500).json({
      message: "Failed to create chat",
      error: error.message,
    });
  }
};
export const UpdateChat = async (req: Request, res: Response) => {
  try {
    const parsedBody =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const requestBody =
      typeof parsedBody.body === "string"
        ? JSON.parse(parsedBody.body)
        : parsedBody.body;

    const { chatId, messagesArray } = requestBody;

    if (!chatId) {
      throw "Chat ID is required";
    }

    const updatedChat = await chatService.updateChatService({
      chatId,
      messagesArray,
    });

    res.status(200).json({
      message: "Chat updated successfully",
      chat: updatedChat,
    });
  } catch (error: any) {
    console.error("[UPDATE_CHAT_ERROR]", error);
    res.status(500).json({
      message: "Failed to update chat",
      error: error.message || error,
    });
  }
};

export const DeleteChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      throw "Chat ID is required";
    }

    await chatService.deleteChatService(chatId);

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error: any) {
    console.error("[DELETE_CHAT_ERROR]", error);
    res.status(500).json({
      message: "Failed to delete chat",
      error: error.message || error,
    });
  }
};
