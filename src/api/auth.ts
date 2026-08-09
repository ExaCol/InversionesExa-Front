const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

type LoginResponse = RegisterResponse;

export async function login(data: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Error al iniciar sesión");
  }

  return res.json();
}

export async function register(
  data: RegisterPayload,
): Promise<RegisterResponse> {
  console.log(BASE_URL);
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Error al registrar usuario");
  }

  return res.json();
}

export const authApi = {
  login,
  register,
};
