import mongoose from "mongoose";

export interface INote extends mongoose.Document {
    _id: string;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;