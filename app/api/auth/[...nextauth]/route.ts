import mongoose from "mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Profile from "../../../models/ProfileSchema"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await mongoose.connect(`${process.env.MONGODB_URI}/test`);

      const oldProfile = await Profile.findOne({ email: user.email });

      if (oldProfile) {
        return true; 
      }

      const newProfile = new Profile({
        ...user,
        collections : []
      });
      
      await newProfile.save();

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };