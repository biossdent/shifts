import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const { token, user } = await loginUser(email, password);
    return NextResponse.json({ token, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
