import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { num1, num2 } = await req.json();

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return NextResponse.json({ error: "Invalid numbers" }, { status: 400 });
  }

  const sum = num1 + num2;
  return NextResponse.json({ sum });
}
