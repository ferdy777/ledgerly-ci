const APP_NAME = "Ledgerly";

const PORTAL_LABELS: Record<string, string> = {
  individual: "Individual",
  corporate: "Corporate",
  insurer: "Insurer",
  hmo: "HMO",
};

// Segments that are record ids (uuids / numbers) say nothing about the page.
const isIdSegment = (segment: string) =>
  /^[0-9a-f-]{8,}$/i.test(segment) || /^\d+$/.test(segment);

const toLabel = (segment: string) =>
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// "/individual/settings/bank-accounts" → "Bank Accounts · Individual · Ledgerly"
export const getPageTitle = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const portal = PORTAL_LABELS[segments[0]];
  const pageSegments = (portal ? segments.slice(1) : segments).filter(
    (s) => !isIdSegment(s),
  );
  const page = pageSegments.length
    ? toLabel(pageSegments[pageSegments.length - 1])
    : "";

  return [page, portal, APP_NAME].filter(Boolean).join(" · ");
};
