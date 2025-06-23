import { BaseRule } from "../rules/baseRule";
import ToneRule from "../rules/toneRule";

export async function runAllRules(emailText: string) {
  const rules: BaseRule[] = [new ToneRule()];
  const results = await Promise.all(
    rules.map((rule) => rule.evaluate(emailText))
  );

  return results;
}
