import DynamicModel from "../../models/program";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Request body:", req.body); // Log the request body
    const body = await req.json();
    const programData = body;
    await DynamicModel.create(programData); // Update the model usage to DynamicModel

    return NextResponse.json({ message: "Program created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error creating program" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const programs = await DynamicModel.find(); // Update the model usage to DynamicModel

    return NextResponse.json({ data: programs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { message: "Failed to fetch programs", error: error.message },
      { status: 500 }
    );
  }
}
