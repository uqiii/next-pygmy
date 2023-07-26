// import { ObjectId } from "mongodb";
import Journal from "~models/journal";
import { connectToDB } from "~utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        console.log('=== params', params);

        const journals = await Journal.find({
          
        })

        return new Response(JSON.stringify(journals), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch journals", { status: 500 })
    }
} 