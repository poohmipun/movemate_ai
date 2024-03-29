import Programs from "@app/(model)/programs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const programsData = body.formData;
    await Programs.create(programsData);
    return NextResponse.json(
      { message: "Programs Created", error },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
