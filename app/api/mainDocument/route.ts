import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import MainDocument from "@/app/models/MainDocumentSchema";


async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
  }
}


export async function POST(request : NextRequest) {
  try {
    await connectDB();

    const { id } = await request.json();

    const doc = await MainDocument.findOne({id});

    if(!doc){
      return NextResponse.json({ status: 200, message : "doc not found" });
    }

    return NextResponse.json({ status: 200, doc });
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.error("Operation failed:", error);

    return NextResponse.json(
      { status: 500, message: `Internal Server Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}