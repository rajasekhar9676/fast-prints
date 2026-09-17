export const CUSTOMER_COOKIE = "fp_customer";

function sessionSecret() {
  return process.env.CUSTOMER_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "fast-prints-customer-dev";
}

async function signUserId(userId: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(userId));
  return Buffer.from(signature).toString("base64url");
}

export async function createCustomerToken(userId: string) {
  const sig = await signUserId(userId);
  return `${userId}.${sig}`;
}

export async function verifyCustomerToken(token?: string | null): Promise<string | null> {
  if (!token) return null;

  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;

  const userId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!userId || !sig) return null;

  const expected = await signUserId(userId);
  if (sig !== expected) return null;

  return userId;
}
