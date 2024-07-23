import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    filename: String,
});

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    attachmentType: {
        type: String,
        required: true,
    },
    attachment: AttachmentSchema,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;
