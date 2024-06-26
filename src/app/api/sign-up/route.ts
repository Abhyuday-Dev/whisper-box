import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerfiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerfiedByUsername) {
      return Response.json(
        {
          success: false,
          messsage: "username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserVerfiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserVerfiedByEmail) {
      if (existingUserVerfiedByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            messsage: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerfiedByEmail.password = hashedPassword;
        existingUserVerfiedByEmail.verifyCode = verifyCode;
        existingUserVerfiedByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000
        );

        await existingUserVerfiedByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        isVerified: false,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    //sending verification code
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          messsage: emailResponse.message,
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          success: true,
          messsage: "User registered successfully.Please verify your email",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      {
        status: 500,
      }
    );
  }
}
