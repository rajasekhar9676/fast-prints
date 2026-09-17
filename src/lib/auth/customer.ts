import { cookies } from "next/headers";
import type { CustomerPublic } from "@/types/user";
import { getUserById } from "@/lib/cms/queries";
import { createCustomerToken, CUSTOMER_COOKIE, verifyCustomerToken } from "@/lib/auth/customer-session";

export { CUSTOMER_COOKIE, createCustomerToken, verifyCustomerToken };

export async function setCustomerSession(userId: string) {
  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, await createCustomerToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCustomerSession() {
  const jar = await cookies();
  jar.delete(CUSTOMER_COOKIE);
}

export async function getCustomerIdFromSession(): Promise<string | null> {
  const jar = await cookies();
  return verifyCustomerToken(jar.get(CUSTOMER_COOKIE)?.value);
}

export async function getCustomerFromSession(): Promise<CustomerPublic | null> {
  const userId = await getCustomerIdFromSession();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}

export function toPublicUser(user: { passwordHash: string } & CustomerPublic): CustomerPublic {
  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}
