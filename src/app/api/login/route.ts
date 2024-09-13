import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getByEmail } from '@/services/user.service';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const user = await getByEmail(email);
    if (!user) return NextResponse.json({ error: 'Email no registrado' }, { status: 400 });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 400 });
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
