import {NextRequest, NextResponse} from "next/server";
import Note from "@/backend/Database/Models/Note";

export const DELETE = async (request: NextRequest, {params}: { params: { id: number } }) => {
    try {
        const id =params.id;
        const noteExists = await Note.exists({_id: id});
        if (!noteExists) {
            return NextResponse.json({success: false, message: "Note not found"}, {status: 404});
        }
        await Note.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Note deleted successfully"}, {status: 200});
    } catch (error) {
        console.error("An error occurred while deleting note:", error);
        return NextResponse.json({success: false, message: "An error occurred while deleting note"}, {status: 500});
    }
}