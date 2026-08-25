import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/modules/dashboard/components/dashboard-layout";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});
