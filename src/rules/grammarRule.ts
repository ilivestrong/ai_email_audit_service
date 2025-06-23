import { AskLLM } from "../llm/helper";
import { BaseRule, RuleResult } from "./baseRule";

export default class GrammarRule implements BaseRule {
  async evaluate(emailContent: string): Promise<RuleResult> {
    const prompt = `
    You are a grammar audit assistant. Given an email body, return a JSON object with the fields:
    {{
      "pass": true/false,         // true if grammar is acceptable
      "explanation": "<short explanation about grammar quality>"
      }}

    Consider spelling, punctuation, and sentence structure. Be objective.

    Respond ONLY with a JSON object. Do not add commentary, notes, or explanations before or after the JSON.

    Email:
    {email}
`;

    try {
      const llmResponse = await AskLLM(prompt, {
        email: emailContent,
      });

      const match = llmResponse.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid response received from LLM.");
      return JSON.parse(llmResponse);
    } catch (e) {
      return {
        pass: false,
        explanation: "LLM response could not be parsed properly.",
      };
    }
  }
}
