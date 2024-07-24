import mongoose from "mongoose";

interface INote extends mongoose.Document {
    title: string;
    contentType: string;
    content: string;
}

const noteSchema = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required:
                    true
            },
            category: {
                type: String,
                required: true
            },
            attachmentType: {
                type: String,
                required: true,
                enum: ['text', 'image', 'time', 'location']
            },
            attachment: {
                type: String,
                required: false
            },
        },
        {
            timestamps: true
        }
    )
;

const Note: mongoose.Model<INote> = mongoose.models.Note || mongoose.model('Note', noteSchema);

export default Note;