import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        name: v.optional(v.string()),
        email: v.string(),
        image: v.string(),
        tokenIdentifier: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            email: args.email,
            name: args.name,
            image: args.image,
            isOnline:true,
        })
    }
});

export const setUserOffline = internalMutation({
    args: {tokenIdentifier: v.string()}, 
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
        .unique();

        if (!user) {
            throw new ConvexError("user not found");
        }
        await ctx.db.patch(user._id, {isOnline: false})
    }
})


