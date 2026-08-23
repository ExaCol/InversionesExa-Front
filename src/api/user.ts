const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

function authHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export async function getCountryStatus(accessToken: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/usr/country`, {
    headers: authHeaders(accessToken),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Error al consultar el país del usuario");
  }

  return res.json();
}

export async function updateCountry(
  accessToken: string,
  countryCode: string,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/usr/country`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ countryCode }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Error al actualizar el país");
  }
}

export const userApi = {
  getCountryStatus,
  updateCountry,
};
