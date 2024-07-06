// pages/api/get-messages.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not Authenticated" }),
      { status: 401 }
    );
  }
  const user = session.user;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const users = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messages: users[0].messages }),
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpected Error Occurred:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected Error Occurred",
      }),
      { status: 500 }
    );
  }
}
