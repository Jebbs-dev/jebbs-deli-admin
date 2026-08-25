import { createFileRoute } from "@tanstack/react-router";
import useAuthStore from "@/state-store/auth";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuthStore();
  return <div>{user?.name ? `Settings for ${user.name}` : null}</div>;
}
