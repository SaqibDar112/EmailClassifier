const sampleSubjects = [
  "Invoice for your recent purchase",
  "Your friend mentioned you",
  "Big sale: up to 70% off!",
  "Meeting request: Project sync",
  "Weekly newsletter from ACME",
  "Reset your password",
  "Invitation to connect on SocialNet",
  "Your subscription will renew",
  "Job application received",
  "Special offer just for you"
];

const sampleFrom = [
  "noreply@shop.com",
  "friend@example.com",
  "newsletter@acme.com",
  "hr@company.com",
  "social@socialnet.com",
  "support@service.com",
];

export function fetchMockEmails(count = 10) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      id: `mock-${i}`,
      from: sampleFrom[i % sampleFrom.length],
      subject: sampleSubjects[i % sampleSubjects.length],
      snippet:
        "This is a short preview of the email content. The full content will be fetched via the Gmail API when backend is connected.",
      date: new Date(Date.now() - i * 3600 * 1000).toLocaleString(),
      raw: "Full raw message would be here"
    });
  }
  return arr;
}
