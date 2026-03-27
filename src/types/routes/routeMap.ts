import AppRoute from "../types";

export type RouteDefinition = {
  id: string;
  label: string;
  route: AppRoute;
};

export const adultRouteMap: RouteDefinition[] = [
  { id: "plots", label: "My Plots", route: "home-plot-setup" },
  { id: "gardens", label: "Gardens", route: "garden" },
  { id: "hunting", label: "Hunting", route: "hunting" },
  { id: "equipment", label: "Equipment", route: "equipment" },
  { id: "settings", label: "Settings", route: "settings" },
];

export const explorerRouteMap: RouteDefinition[] = [
  { id: "animals", label: "Animals", route: "explorer-app" },
  { id: "trees", label: "Trees", route: "explorer-app" },
  { id: "gardens", label: "Gardens", route: "explorer-app" },
];