import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/token.util';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    // Verifica el token con tu servicio de autenticación aquí
    const user = await verifyToken(token);

    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

