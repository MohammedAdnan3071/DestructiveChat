import { InferRealtimeEvents, Realtime } from "@upstash/realtime"
import z from "zod"
import {redis } from "@/lib/redis"

const message = z.object({
    id:z.string(),
    sender:z.string(),
    text:z.string(),
    timestamp:z.number(),
    roomId: z.string(),
    token:z.string().optional(),
})


const schema = {
    chat:{
        message, 
        destory:z.object({
            isDestoryed:z.literal(true),
        }),
    },
}



export const realtime = new Realtime({schema, redis})
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
export type Message = z.infer<typeof message>



// export const realtime = new Realtime ({schema, redis})
// this creates a real time server instance using upstash realtime. 
// it connects your event rules to Redis so messages can be sned and received instantly 

//export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
// This line automatically generates Ts types for all real time events based on your schema . 
// Instead of manually writing types, Ts now knows exactly what events exist and what data they contain .


// export type Message = z.infer<typeof message>
//this creates a Ts type called Message direclty from the zod schema . 
// Anywhere in you app, you can use message, and be sure it matches the structure of a valid chat message 
