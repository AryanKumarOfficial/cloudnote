const mongoose = require("mongoose");

const connectTOdb = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI);
    }
    return handler(req, res);
}

export default connectTOdb;