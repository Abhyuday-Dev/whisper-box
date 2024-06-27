import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request){
    await dbConnect();

    const session=await getServerSession(authOptions);
    const user:User=session?.user;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }
    const userId=user._id;

    const {acceptMessages} = await request.json();

    try {
        const updatedUser=await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"Failed to update user"
            },{status:401})
        }else{
            return Response.json({
                success:true,
                message:"Succssfully updated user status to accept messages"
            },{status:200})
        }
    } catch (error) {
        console.error("Failed to update user status to accept messages",error);
        return Response.json({
            success:false,
            message:"Failed to update user status to accept messages"
        },{status:500})
    }


}

export async function GET(request:Request) {
    await dbConnect();
    const session=await getServerSession(authOptions);
    const user:User=session?.user;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    const userId=user._id;

    try {
        const foundUser= await UserModel.findById(userId);

    if(!foundUser){
        return Response.json({
            success:false,
            message:"User Not Found"
        },{status:404})
    }else{
        return Response.json({
            success:true,
            isAcceptingMessage:foundUser.isAcceptingMessage,
            message:"User Found"
        },{status:200})
    }
    } catch (error) {
        console.error("Fialed to get user isAccepting message status",error);
        return Response.json({
            success:false,
            message:"Failed to get User isAccepting message status"
        },{status:500})
    }
}