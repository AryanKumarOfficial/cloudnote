import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/config";
import Note from "@/models/Note";

connect().then(() => {
    console.log("connected to DB")
})

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
    try {
        const id = params.id;
        if (id.length !== 24) {
            return NextResponse.json({
                success: false,
                error: "Invalid ID",
            }, {status: 401})
        }
        await Note.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: "Note Delete successfully!"
        }, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, {status: 500})
    }
}