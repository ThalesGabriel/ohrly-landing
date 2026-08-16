export type Hypothesis = {
  id: string;
  pValue: number;
};

function clampProbability(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}

// Abramowitz & Stegun approximation for the standard normal CDF.
function normalCdf(z: number) {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    sign *
    (1 -
      (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) *
        Math.exp(-x * x));
  return 0.5 * (1 + erf);
}

/**
 * One-sided two-proportion z-test: H1 = candidate rate > complement rate.
 * We compare the candidate cohort against its complement rather than the
 * overall baseline because the candidate is contained in the baseline.
 */
export function enrichmentPValue(input: {
  candidatePositives: number;
  candidateTotal: number;
  complementPositives: number;
  complementTotal: number;
}) {
  const { candidatePositives, candidateTotal, complementPositives, complementTotal } = input;

  if (candidateTotal <= 0 || complementTotal <= 0) return 1;

  const p1 = candidatePositives / candidateTotal;
  const p2 = complementPositives / complementTotal;
  if (p1 <= p2) return 1;

  const pooled =
    (candidatePositives + complementPositives) /
    (candidateTotal + complementTotal);
  const variance =
    pooled *
    (1 - pooled) *
    (1 / candidateTotal + 1 / complementTotal);

  if (variance <= 0) return 1;

  const z = (p1 - p2) / Math.sqrt(variance);
  return clampProbability(1 - normalCdf(z));
}

/** Benjamini-Hochberg FDR adjusted p-values (q-values). */
export function benjaminiHochberg(hypotheses: Hypothesis[]) {
  const sorted = [...hypotheses].sort((a, b) => a.pValue - b.pValue);
  const m = sorted.length;
  let running = 1;
  const adjusted = new Map<string, number>();

  for (let i = m - 1; i >= 0; i -= 1) {
    const rank = i + 1;
    const q = Math.min(running, (sorted[i].pValue * m) / rank);
    running = q;
    adjusted.set(sorted[i].id, clampProbability(q));
  }

  return adjusted;
}

/** Holm step-down family-wise error correction. */
export function holmAdjustment(hypotheses: Hypothesis[]) {
  const sorted = [...hypotheses].sort((a, b) => a.pValue - b.pValue);
  const m = sorted.length;
  let running = 0;
  const adjusted = new Map<string, number>();

  for (let i = 0; i < m; i += 1) {
    const multiplier = m - i;
    const value = Math.min(1, sorted[i].pValue * multiplier);
    running = Math.max(running, value);
    adjusted.set(sorted[i].id, clampProbability(running));
  }

  return adjusted;
}

export function wilsonInterval(positives: number, total: number, z = 1.96) {
  if (total <= 0) return { low: 0, high: 0 };
  const p = positives / total;
  const z2 = z * z;
  const denominator = 1 + z2 / total;
  const center = (p + z2 / (2 * total)) / denominator;
  const margin =
    (z / denominator) *
    Math.sqrt((p * (1 - p)) / total + z2 / (4 * total * total));
  return {
    low: Math.max(0, center - margin),
    high: Math.min(1, center + margin),
  };
}
