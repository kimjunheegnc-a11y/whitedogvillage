import { google } from "googleapis";

export async function createReservationCalendarEvent(params: {
  title: string;
  description: string;
  start: Date;
  end: Date;
}) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn("[gcal] Google OAuth not configured; skipping calendar event");
    return { eventId: null as string | null, skipped: true as const };
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: params.title,
      description: params.description,
      start: { dateTime: params.start.toISOString(), timeZone: "Asia/Seoul" },
      end: { dateTime: params.end.toISOString(), timeZone: "Asia/Seoul" },
    },
  });

  return { eventId: res.data.id ?? null, skipped: false as const };
}
