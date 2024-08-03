import mongoose from "mongoose";

interface INote extends mongoose.Document {
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