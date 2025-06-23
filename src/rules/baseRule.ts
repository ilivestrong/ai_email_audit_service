export interface RuleResult {
  pass: Boolean;
  explanation: string;
}

export interface BaseRule {
  evaluate(emailContent: string): Promise<RuleResult>;
}
