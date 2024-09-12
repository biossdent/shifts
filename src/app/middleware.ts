import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}

// Aplica el middleware solo a rutas específicas
export const config = {
  matcher: ['/api/protected/:path*'],
};
