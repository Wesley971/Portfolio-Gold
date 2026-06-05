import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // On GitHub Pages project page: set VITE_BASE_URL=/<repo-name>/ in the workflow
  base: "/Portfolio-Gold/",
});
