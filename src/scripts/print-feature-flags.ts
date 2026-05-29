import { loadEnvConfig } from "@next/env";
import { getFeatureFlags } from "../feature-flags";

// Carrega .env, .env.local etc. como o Next faz
loadEnvConfig(process.cwd());

const featureFlags = getFeatureFlags();

console.log("\n[Ohrly] Feature flags at build time:");

for (const [name, enabled] of Object.entries(featureFlags)) {
  console.log(`- ${name}: ${enabled ? "enabled" : "disabled"}`);
}

const enabledFlags = Object.entries(featureFlags)
  .filter(([, enabled]) => enabled)
  .map(([name]) => name);

if (enabledFlags.length === 0) {
  console.log("[Ohrly] No feature flags enabled.");
} else {
  console.log(`[Ohrly] Enabled flags: ${enabledFlags.join(", ")}`);
}

console.log("");