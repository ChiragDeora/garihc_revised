export const CONTACT_EMAIL = "info@garihc.com";
export const CAL_LINK = "chirag-deora/30min";

/** Opens Gmail compose in a new browser tab instead of the system mail client. */
export function gmailComposeUrl(
  to = CONTACT_EMAIL,
  subject = "",
  body = ""
): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function gmailComposeWithDetails(
  subject = "New project — GARIHC"
): string {
  const body = [
    "Hi GARIHC,",
    "",
    "Company: ",
    "Designation: ",
    "Project budget (approx): ",
    "Expected timeline: ",
    "",
    "Brief about the project:",
    "",
  ].join("\n");
  return gmailComposeUrl(CONTACT_EMAIL, subject, body);
}
