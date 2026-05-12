import { json } from '@sveltejs/kit';
import { registerMiddleware, type ApiEvent } from '../provider/routeProvider';

export const authMiddleware = async (event: ApiEvent) => {
    const token = event.cookies.get('token') || event.request.headers.get('Authorization');
    
    if (!token) {
        return json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Simulasi verifikasi token dan pengambilan data user
    // Di dunia nyata, Anda akan memverifikasi JWT atau cek session di DB
    event.user = {
        id: 'user_123',
        name: 'Fiyosa User',
        email: 'user@fiyosa.com'
    };

    // Lanjut ke proses berikutnya
};

// Registrasi middleware dengan nama "auth"
registerMiddleware('auth', authMiddleware);
