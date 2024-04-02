import Program from "../../models/program";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const programData = body;
    await Program.create(programData);

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
    const programs = await Program.find();

    return NextResponse.json({ data: programs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { message: "Failed to fetch programs", error: error.message },
      { status: 500 }
    );
  }
}
