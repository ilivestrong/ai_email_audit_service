import { AskLLM } from "../llm/helper";
import { BaseRule, RuleResult } from "./baseRule";

export default class ToneRule implements BaseRule {
  async evaluate(emailContent: string): Promise<RuleResult> {
    const prompt = `
    You are a tone evaluation assistant.

    Given the email text, respond ONLY with a JSON object like:
    {{
      "pass": true or false, // true if tone is acceptable
      "explanation": "<short explanation of the tone>"
      }}

    Respond ONLY with a JSON object. Do not add commentary, notes, or explanations before or after the JSON.

    Email:
    {email}
`;

    try {
      const llmResponse = await AskLLM(prompt, {
        email: emailContent,
      });
      return JSON.parse(llmResponse);
    } catch (e) {
      return {
        pass: false,
        explanation: "LLM response could not be parsed properly.",
      };
    }
  }
}
