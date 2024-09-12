import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const user = await registerUser(email, password);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
