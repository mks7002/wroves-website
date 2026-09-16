import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getConfig() {
  return {
    password: process.env.WROVES_ADMIN_PASSWORD,
    secret: process.env.WROVES_ADMIN_SESSION_SECRET,
  };
}

export function isAdminConfigured() {
  const { password, secret } = getConfig();
  return Boolean(password && secret);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSession() {
  const { secret } = getConfig();
  if (!secret) throw new Error("WROVES_ADMIN_SESSION_SECRET is not configured");
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const nonce = randomBytes(24).toString("base64url");
  const payload = `${expires}.${nonce}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(value: string | undefined) {
  const { secret } = getConfig();
  if (!value || !secret) return false;

  const [expiresRaw, nonce, signature] = value.split(".");
  const expires = Number(expiresRaw);
  if (!expires || !nonce || !signature || expires < Math.floor(Date.now() / 1000)) return false;

  const payload = `${expires}.${nonce}`;
  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyAdminPassword(password: string) {
  const configured = getConfig().password;
  if (!configured || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(configured);
  return a.length === b.length && timingSafeEqual(a, b);
}

export { SESSION_MAX_AGE };
