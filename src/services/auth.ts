import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
}

interface AuthResponse {
    token: string;
    refresh_token: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
    };
}

// Token storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token management
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Auth API calls
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/login/', credentials);
    const { token, refresh_token } = response.data;
    setToken(token);
    setRefreshToken(refresh_token);
    return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/register/', data);
    const { token, refresh_token } = response.data;
    setToken(token);
    setRefreshToken(refresh_token);
    return response.data;
};

export const logout = async (): Promise<void> => {
    try {
        await api.post('/users/logout/');
    } finally {
        removeToken();
    }
};

export const refreshToken = async (): Promise<string> => {
    const refresh_token = getRefreshToken();
    if (!refresh_token) {
        throw new Error('No refresh token available');
    }

    const response = await api.post<{ token: string }>('/users/refresh-token/', {
        refresh_token,
    });

    const { token } = response.data;
    setToken(token);
    return token;
};

export const verifyEmail = async (token: string): Promise<void> => {
    await api.post('/users/verify-email/', { token });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
    await api.post('/users/request-password-reset/', { email });
};

export const resetPassword = async (token: string, new_password: string): Promise<void> => {
    await api.post('/users/reset-password/', {
        token,
        new_password,
    });
};

export const changePassword = async (
    old_password: string,
    new_password: string
): Promise<void> => {
    await api.post('/users/change-password/', {
        old_password,
        new_password,
    });
};

// Auth state check
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

// User profile
export const getProfile = async () => {
    const response = await api.get('/users/profile/');
    return response.data;
};

export const updateProfile = async (data: any) => {
    const response = await api.patch('/users/profile/', data);
    return response.data;
}; 