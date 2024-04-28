import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { v } from 'convex/values';
import { action } from "./_generated/server";
import { api } from './_generated/api';

// Ensure your environment variable is set correctly
const apiKey = process.env.GAPI_KEY;
if (!apiKey) {
    throw new Error("Missing API key. Please set the GAPI_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const chat = action({
    args: {
        messageBody: v.string(),
        conversation: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        try {
            const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt: string = args.messageBody;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text: string = await response.text();

            await ctx.runMutation(api.messages.sendChatGptMessage, {
                content: text || "I am sorry, I do not understand that",
                conversation: args.conversation,
            });
        } catch (error) {
            console.error("Error processing message:", error);
            // Handle errors, if any
            // You might want to send an error message back to the conversation
            await ctx.runMutation(api.messages.sendTextMessage, {
                content: "An error occurred while processing your message",
                conversation: args.conversation,
                sender: "ChatBot",
            });
        }
    }
});



// Access your API key as an environment variable (see "Set up your API key" above)







