import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Collection from "@/app/models/CollectionSchema"; // Assuming Collection is your Mongoose Model

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
  }
}

// Define the type for your filter object
interface FilterObject {
  course: string | null;
  year: number | null; // This should be 'number | null' if your DB stores year as number
  semester: number | null; // This should be 'number | null' if your DB stores semester as number
  // If semester can be "Fall", "Spring", etc., then it should be 'string | null'
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { course, year, semester }: FilterObject = await request.json();

    console.log({ course, year, semester });

    // The query object's values can be string or number, so we use `unknown`
    // and let TypeScript infer specific types based on assignments if possible,
    // or keep it broad like `any` only if absolutely necessary for the value type.
    // However, for MongoDB queries, string | number is usually sufficient.
    const query: { [key: string]: string | number } = {}; // More specific type for query values

    if (course !== null) {
      query.course = course;
    }
    if (year !== null) {
      query.year = year;
    }
    if (semester !== null) {
      query.semester = semester;
    }

    console.log("MongoDB query:", query);

    const data = await Collection.find(query).sort({ created_at: 1 });

    return NextResponse.json({ status: 200, collections: data });
  } catch (error: unknown) { // Changed 'any' to 'unknown'
    let errorMessage = "Unknown error";
    if (error instanceof Error) { // Type guard to check if it's an Error instance
      errorMessage = error.message;
    } else if (typeof error === 'string') { // If it's a plain string error
      errorMessage = error;
    }

    console.error("Operation failed:", error); // Still log the original error for full context
    return NextResponse.json(
      { status: 500, message: `Internal Server Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}