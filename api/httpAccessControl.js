const ALLOWED_ORIGINS = new Set(["https://ai-quiz-2-r8d2.onrender.com", "http://localhost"]);
const LOCALHOST_WITH_PORT_PATTERN = /^http:\/\/localhost:\d+$/;

const normalizeOrigin = (origin) => {
  if (!origin || typeof origin !== "string") {
    return "";
  }

  try {
    const parsed = new URL(origin);
    return parsed.origin;
  } catch {
    return origin.trim();
  }
};

export const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  const normalized = normalizeOrigin(origin);
  return ALLOWED_ORIGINS.has(normalized) || LOCALHOST_WITH_PORT_PATTERN.test(normalized);
};

export const enforceOriginAllowlist = (req, res, next) => {
  const origin = req.get("origin");

  if (!origin || isAllowedOrigin(origin)) {
    next();
    return;
  }

  res.status(403).json({ message: "Origin not allowed." });
};

export const requireHttpAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  if (req.auth?.userId) {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized" });
};
