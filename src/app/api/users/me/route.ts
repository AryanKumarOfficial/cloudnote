import {getTokenData} from "@/helpers/getTokenData";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import {connect} from "@/dbConfig/config";


connect().then(() => console.log("Connected to database"));

export async function GET(req: NextRequest) {
    try {
        const userID = await getTokenData(req);
        const user = await User.findById(userID).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: user, success: true
        })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error}, {status: 401});
    }
}