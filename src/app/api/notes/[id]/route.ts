import {connect} from "@/dbConfig/config";
import {NextRequest, NextResponse} from "next/server";
import Note from "@/models/Note";

connect().then(() => {
    console.log("connect to DB")
})

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {

    try {
        const notes = await Note.findById(params.id);

        return NextResponse.json({
            success: true,
            notes: notes,
            message: "No Notes found"
        })
    } catch
        (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {status: 500})
    }
}