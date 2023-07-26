// import { ObjectId } from "mongodb";
import Journal from "~models/journal";
import { connectToDB } from "~utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const journals = await Journal.find({
          owner: params.id
        }).sort({ createdAt: -1 })

        return new Response(JSON.stringify(journals), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch journals", { status: 500 })
    }
} 