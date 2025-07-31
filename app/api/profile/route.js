/** @format */

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Profile from "@/app/models/ProfileSchema";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
  }
}

export async function POST(request) {
  try {
    connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ status: 500, message: "id is required" });
    }

    const userData = await Profile.findOne({ id });

    if (!userData)
      return NextResponse.json({ status: 500, message: "user doesnt exist" });

    return NextResponse.json({ status: 200, userData });
  } catch {
    return NextResponse.json({ status: 400, message: "internal server error" });
  }
}
