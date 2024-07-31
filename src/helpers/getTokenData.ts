import {NextRequest} from "next/server";
import JWT, {JwtPayload} from "jsonwebtoken";

export const getTokenData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const data: any = JWT.verify(token, process.env.TOKEN_SECRET || "");
        return data.id;

    } catch (error: any) {
        throw new Error(error.message);
    }
};