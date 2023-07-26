import Journal from "~models/journal";
import { connectToDB } from "~utils/database";

export const POST = async (request) => {
    const { userId, thought } = await request.json();

    try {
        await connectToDB();
        const newJournal = new Journal({
          owner: userId,
          thought,
          createdAt: new Date()
        });

        await newJournal.save();
        return new Response(JSON.stringify(newJournal), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new journal", { status: 500 });
    }
}