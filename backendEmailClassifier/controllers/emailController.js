import { google } from "googleapis";

export const getEmails = async (req, res) => {
  try {
    const { token, maxResults } = req.query;
    if (!token) return res.status(400).json({ error: "Missing access token" });

    google.gmail({ version: "v1" });
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token });

    const gmailApi = google.gmail({ version: "v1", auth });

    const result = await gmailApi.users.messages.list({
      userId: "me",
      maxResults: maxResults || 15,
    });

    const messages = result.data.messages || [];

    const detailedEmails = [];
    for (const msg of messages) {
      const msgData = await gmailApi.users.messages.get({
        userId: "me",
        id: msg.id,
      });

      const headers = msgData.data.payload.headers;
      const subject = headers.find((h) => h.name === "Subject")?.value || "No subject";
      const from = headers.find((h) => h.name === "From")?.value || "Unknown Sender";

      detailedEmails.push({
        id: msg.id,
        from,
        subject,
        snippet: msgData.data.snippet,
      });
    }

    res.json({ emails: detailedEmails });
  } catch (err) {
    console.error("Error fetching emails:", err);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};