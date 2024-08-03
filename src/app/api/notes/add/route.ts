import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import Note from "@/models/Note";
import {getTokenData} from "@/helpers/getTokenData";

connect().then(() => console.log("DB connected"))

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const userId = getTokenData(request);
        const {title, content} = reqBody;
        if (!title || !content || !userId) {
            return NextResponse.json({
                success: false,
                error: "Incomplete Data"
            }, {status: 404})
        }

        const newNote = new Note({
            title,
            content,
            author: userId
        })

        await newNote.save();
        return NextResponse.json({
            newNote,
            success: true,
            message: "Note Added successfully!"
        }, {status: 201})

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {status: 500})
    }
}