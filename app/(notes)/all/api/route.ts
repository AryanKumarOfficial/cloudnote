import connectDB from "@/backend/Database/helpers/mongoose";
import Note from "@/backend/Database/Models/Note";
import {NextResponse} from "next/server";

connectDB().then(() => console.log("Connected to DB"));

export const GET = async () => {
    try {
        const notes = await Note.find();
        return NextResponse.json({success: true, notes}, {status: 200});
    } catch (error) {
        return NextResponse.json({sucess: false, notes: null}, {status: 500})
    }
}