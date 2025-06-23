// src/engine/reportGenerator.ts
import { SummarizeResults } from "../llm/helper";
import { RuleResult } from "../rules/baseRule";

export async function generateReport(results: RuleResult[]) {
  const passCount = results.filter((r) => r.pass).length;
  const emailContentAuditSummary = await SummarizeResults(results);

  return {
    totalScore: `${passCount}/${results.length}`,
    results,
    summary: emailContentAuditSummary,
  };
}
