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
  year: number | null;
  semester: number | null;
  searchFilter: string | null; // Changed to string | null as it might be empty/null
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { course, year, semester, searchFilter }: FilterObject = await request.json();

    console.log({ course, year, semester, searchFilter });

    // FIX: More specific type for query values
    // This type allows for string, number, or an object containing $regex for the value.
    const query: { [key: string]: string | number | { $regex: string; $options: string } } = {};

    if (course !== null) {
      query.course = course;
    }
    if (year !== null) {
      query.year = year;
    }
    if (semester !== null) {
      query.semester = semester;
    }

    // Add search filter using $regex
    if (searchFilter && searchFilter.trim() !== "") {
      query.title = { $regex: searchFilter, $options: "i" };
    }

    console.log("MongoDB query:", query);

    const data = await Collection.find(query).sort({ created_at: 1 });

    return NextResponse.json({ status: 200, collections: data });
  } catch (error: unknown) {
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