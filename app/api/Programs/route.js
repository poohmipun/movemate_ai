// route.js
import WorkoutProgram from "../../models/workoutprogram"; // Updated import to match the new model name
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const programData = await req.json();
    console.log("Received data:", programData); // Log to see what data is received

    if (!programData.img_url) {
      throw new Error("img_url is required");
    }

    await WorkoutProgram.create(programData);
    return new NextResponse(JSON.stringify({ message: "Program created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error creating program",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const programs = await WorkoutProgram.find(); // Fetch all documents from MongoDB
    return new NextResponse(JSON.stringify({ data: programs }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to fetch programs",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
