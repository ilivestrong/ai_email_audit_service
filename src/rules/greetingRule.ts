import { BaseRule, RuleResult } from "./baseRule";

const greetingPatterns = [
  /\bhi\b/i,
  /\bhello\b/i,
  /\bdear\s+\w+/i,
  /\bgreetings\b/i,
];

export default class GreetingRule implements BaseRule {
  async evaluate(emailText: string): Promise<RuleResult> {
    const hasGreeting = greetingPatterns.some((regex) => regex.test(emailText));

    return {
      pass: hasGreeting,
      explanation: hasGreeting
        ? "Email includes a proper greeting."
        : "Greeting is missing or unclear at the beginning of the email.",
    };
  }
}
