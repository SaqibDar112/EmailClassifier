import express from "express";
import { google } from "googleapis";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const router = express.Router();

const emailCategorySchema = z.object({
  id: z.string().describe("The unique ID of the email"),
  category: z
    .enum([
      "Important",
      "Promotions",
      "Social",
      "Marketing",
      "Spam",
      "General",
    ])
    .describe("The category of the email"),
  subject: z.string().describe("The subject of the email (for matching)"),
});

const emailListSchema = z.object({
  classifications: z
    .array(emailCategorySchema)
    .describe("An array of email classification objects"),
});

router.get("/fetch", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const token = req.user.accessToken;

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const listRes = await gmail.users.messages.list({
      userId: "me",
      maxResults: 15,
    });

    const messages = listRes.data.messages || [];

    const detailedMessages = await Promise.all(
      messages.map(async (msg) => {
        const msgDetail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = msgDetail.data.payload.headers || [];
        const subject =
          headers.find((h) => h.name === "Subject")?.value || "No Subject";
        const from = headers.find((h) => h.name === "From")?.value || "Unknown";
        const snippet = msgDetail.data.snippet || "";

        return { id: msg.id, subject, from, snippet };
      })
    );

    res.json(detailedMessages);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

router.post("/classify", async (req, res) => {
  const { emails, userKey } = req.body;

  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Emails array is required" });
  }

  if (!userKey) {
    return res.status(400).json({ error: "Missing API key" });
  }

  try {
    const outputParser = StructuredOutputParser.fromZodSchema(emailListSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an AI email assistant. Classify each email into one of these categories: Important, Promotions, Social, Marketing, Spam, or General.
        
        {format_instructions}
        `,
      ],
      [
        "human",
        `Here is the list of emails to classify:
        {email_list_string}
        `,
      ],
    ]);

    const model = new ChatGoogleGenerativeAI({
      apiKey: userKey,
      model: "gemini-2.5-flash-lite",
      temperature: 0,
    });

    const chain = promptTemplate.pipe(model).pipe(outputParser);

    const emailListString = emails
      .map(
        (e) =>
          `ID: ${e.id}\nFrom: ${e.from}\nSubject: ${e.subject}\nSnippet: ${e.snippet}`
      )
      .join("\n---\n");

    const result = await chain.invoke({
      email_list_string: emailListString,
      format_instructions: outputParser.getFormatInstructions(),
    });

    const categoryOrder = {
      Important: 1,
      Promotions: 2,
      Social: 3,
      Marketing: 4,
      General: 5,
      Spam: 6,
    };

    const sortedClassifications = result.classifications.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 99;
      const orderB = categoryOrder[b.category] || 99;
      return orderA - orderB;
    });

    res.json(sortedClassifications);
  } catch (error) {
    console.error("Error classifying emails:", error);
    res.status(500).json({ error: "Failed to classify emails with LangChain" });
  }
});

export default router;

