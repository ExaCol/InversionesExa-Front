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
  register,
};
