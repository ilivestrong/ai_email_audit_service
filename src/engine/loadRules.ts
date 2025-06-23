// src/engine/loadRules.ts
import { BaseRule } from "../rules/baseRule";
import config from "../rules/rules.config.json";

export async function loadRules(): Promise<BaseRule[]> {
  const rules: BaseRule[] = [];

  for (const ruleFileName of config.enabledRules) {
    try {
      const ruleModule = await import(`../rules/${ruleFileName}`);
      const RuleClass = ruleModule.default;
      rules.push(new RuleClass());
    } catch (err) {
      console.error(`Failed to load rule ${ruleFileName}:`, err);
    }
  }

  return rules;
}
