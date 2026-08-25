import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return <div>Analytics Page</div>;
}
