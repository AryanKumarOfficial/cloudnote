import {NextRequest, NextResponse} from 'next/server';
import connectDB from "@/backend/Database/helpers/mongoose";
import Note from "@/backend/Database/Models/Note"

connectDB().then(() => console.log('Connected to the database'));

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const body = Object.fromEntries(formData);
        const file = body.file as Blob | null;
        const title = body.title as string || '';
        const content = body.content as string || '';
        const category = body.category as string || '';
        const attachmentType = body.attachmentType as string || '';
        const attachment = file ? await file.arrayBuffer() : body.attachment || null;

        // Save the note to the database
        const note = await Note.create({
            title,
            content,
            category,
            attachmentType,
            attachment
        });

        await note.save();
        return NextResponse.redirect(`http://localhost:3000/all`, {status: 303});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
