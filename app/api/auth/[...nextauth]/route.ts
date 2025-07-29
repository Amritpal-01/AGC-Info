import mongoose from "mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Profile from "../../../models/ProfileSchema"; // Assuming this is a Mongoose model

// Extend the Session and User types to include a custom 'id' property
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
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await mongoose.connect(`${process.env.MONGODB_URI}/AGCInfo`);

      // Ensure the Profile model is correctly typed if you have a Mongoose schema
      const oldProfile = await Profile.findOne({ email: user.email });

      if (oldProfile) {
        return true; // or return user; depending on your desired behavior
      }

      const newProfile = new Profile(user);
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