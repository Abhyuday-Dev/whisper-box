import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "abc@xxxx.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Abhyuday",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if(isPasswordCorrect){
            return user;
          }else{
            throw new Error("Password is incorrect");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages:{
    signIn:"/sign-in"
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.SECRET_KEY
};
