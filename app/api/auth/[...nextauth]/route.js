/** @format */

import mongoose from "mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Profile from "../../../models/ProfileSchema";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await mongoose.connect(`${process.env.MONGODB_URI}/AGCInfo`);

      const oldProfile = Profile.findOne({ email: user.email });

      if (oldProfile) return user;

      const newProfile = new Profile(user);

      await newProfile.save();

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
