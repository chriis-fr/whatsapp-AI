import {defineSchema, defineTable} from 'convex/server'
import { ConvexError, v } from 'convex/values'
import { internalMutation } from './_generated/server';

export default defineSchema({
    users: defineTable({
        name: v.optional(v.string()),
        email: v.string(),
        image: v.string(),
        tokenIdentifier: v.string(),
        isOnline: v.boolean(),
    }).index("by_tokenIdentifier", ["tokenIdentifier"])
});

