const BACKEND_ORIGIN = "http://localhost:5000";

export async function fetchEmailsAPI() {
  try {
    const res = await fetch(`${BACKEND_ORIGIN}/emails`, {
      credentials: "include"
    });
    if (!res.ok) throw new Error("no backend");
    const data = await res.json();
    return data.emails || [];
  } catch (err) {
    console.warn("Backend /emails call failed, returning empty array.", err);
    return [];
  }
}

export async function classifyEmailsAPI(payload) {
  try {
    const res = await fetch(`${BACKEND_ORIGIN}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "classify failed");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Backend /classify failed:", err);
    const fallback = {};
    (payload.emails || []).forEach((e) => {
      const s = (e.subject || "").toLowerCase();
      if (s.includes("sale") || s.includes("offer") || s.includes("discount"))
        fallback[e.id] = "Promotions";
      else if (s.includes("friend") || s.includes("social") || s.includes("connect"))
        fallback[e.id] = "Social";
      else if (s.includes("invoice") || s.includes("payment") || s.includes("invoice"))
        fallback[e.id] = "Important";
      else if (s.includes("newsletter") || s.includes("subscription"))
        fallback[e.id] = "Marketing";
      else fallback[e.id] = "General";
    });
    return { classifications: fallback, mocked: true };
  }
}
