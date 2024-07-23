import Note from "@/Backend/Models/Note";
import connectTOdb from "@/Backend/Middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { title, content, attachmentType, attachment, user } = req.body;
        const note = new Note({
            title,
            content,
            attachmentType,
            attachment,
            user,
        });
        try {
            await note.save();
            return res.status(200).json({ success: true, note });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

export default connectTOdb(handler);