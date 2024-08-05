import {connect} from "@/dbConfig/config";
import Note from "@/models/Note";
import {NextRequest, NextResponse} from "next/server";

connect().then(() => console.log("DB connected"))

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    try {
        const reqBody = await request.json();
        const {title, content} = reqBody;
        if (!title || !content || params.id.length !== 24) {
            return NextResponse.json({
                success: false,
                error: "Incomplete Data"
            }, {status: 402})
        }
        const noteId = params.id;
        const noteExists = await Note.findById(noteId);
        noteExists.title = title;
        noteExists.content = content;
        await noteExists.save();
        return NextResponse.json({
            success: true,
            message: "Update success!",
            noteExists
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {status: 500})
    }

}