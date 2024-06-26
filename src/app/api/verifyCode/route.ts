import { z } from "zod";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    await dbConnect();

    try {
        const { username,code}=await request.json();
        const decodedUsername=decodeURIComponent(username)

        const user=await UserModel.findOne({ username: decodedUsername});
        if(!user){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 500 }
              );
        }

        const isCodeValid=user.verifyCode==code
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            await user.save();
            return Response.json(
                {
                  success: true,
                  message: "User is verified",
                },
                { status: 200 }
              );
        }
        else if(!isCodeNotExpired ){
            return Response.json(
                {
                  success: false,
                  message: "Verification code expired,signup again to get a new code",
                },
                { status: 400 }
              );
        }
        else{
            return Response.json(
                {
                  success: false,
                  message: "Verification code is wrong",
                },
                { status: 400 }
              );
        }
    } catch (error) {
        console.error("Error Checking Verification Code", error);
    return Response.json(
      {
        success: false,
        message: "Verification code validation error",
      },
      { status: 500 }
    );
    }
}