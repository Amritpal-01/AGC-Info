/** @format */

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Collection from "@/app/models/CollectionSchema";
import Profile from "@/app/models/ProfileSchema";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { course, year, semester, searchFilter } = await request.json();

    console.log({ course, year, semester, searchFilter });

    const query = {};

    if (course !== null) {
      query.course = course;
    }
    if (year !== null) {
      query.year = year;
    }
    if (semester !== null) {
      query.semester = semester;
    }

    if (searchFilter && searchFilter.trim() !== "") {
      query.title = { $regex: searchFilter, $options: "i" };
    }

    console.log("MongoDB query:", query);

    const data = await Collection.find(query).sort({ created_at: 1 });

    return NextResponse.json({ status: 200, collections: data });
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

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { collectionId, userId } = body;

    if (!collectionId || !userId) {
      return NextResponse.json(
        { message: "Both collectionId and userId are required" },
        { status: 400 }
      );
    }

    const collectionToAdd = await Collection.findOne({ id: collectionId });

    if (!collectionToAdd) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    const userProfile = await Profile.findOne({ id: userId });

    if (!userProfile) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 }
      );
    }

    let alreadyExist = false;

    userProfile.collections.map((e) => {
      if (e.id === collectionToAdd.id) alreadyExist = true;
    });

    if (alreadyExist) {
      return NextResponse.json(
        { status: 200, message: "not added" },
        { status: 200 }
      );
    }

    userProfile.collections.push(collectionToAdd); //cannot read the properties of undefined push

    await userProfile.save();

    return NextResponse.json(
      { status: 200, message: "Collection added to user profile successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT request:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Connect to the database
    await connectDB();

    // Get the collectionId and userId from the request body
    const body = await request.json();
    const { collectionId, userId } = body;

    // Validate that both collectionId and userId are provided
    if (!collectionId || !userId) {
      return NextResponse.json(
        { message: "Both collectionId and userId are required" },
        { status: 400 }
      );
    }

    // Find the user's profile
    const userProfile = await Profile.findOne({ id: userId });

    // Handle the case where the user profile is not found
    if (!userProfile) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 }
      );
    }

    // Filter out the collection with the matching ID
    const initialCollectionsCount = userProfile.collections.length;
    userProfile.collections = userProfile.collections.filter(
      (collection) => collection.id !== collectionId
    );
    
    // Check if a collection was actually removed
    if (userProfile.collections.length === initialCollectionsCount) {
        return NextResponse.json(
          { status: 200, message: "Collection was not found in the user's profile" },
          { status: 200 }
        );
    }

    // Save the updated user profile
    await userProfile.save();

    return NextResponse.json(
      { status: 200, message: "Collection removed from user profile successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE request:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
