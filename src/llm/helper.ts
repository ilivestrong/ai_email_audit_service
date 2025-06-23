import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";
import { RuleResult } from "../rules/baseRule";

const llm = new ChatOpenAI({
  temperature: 0.3,
  model: process.env.LLM_MODEL,
  maxTokens: 150,
});

export async function SummarizeResults(results: RuleResult[]): Promise<string> {
  const prompt = `
  You are an email audit assistant.

  Given the following list of rule evaluations, summarize the **overall strengths** and **areas for improvement** in 3–4 lines of natural language. Be objective but concise.

  Only include information from the evaluations. Don't make assumptions.

  Evaluations:
  {evaluations}
`;

  const input = {
    evaluations: results
      .map(
        (r, idx) =>
          `${idx + 1}. ${r.pass ? "✅ PASS" : "❌ FAIL"} - ${r.explanation}`
      )
      .join("\n"),
  };

  return AskLLM(prompt, input);
}

export async function AskLLM(template: string, input: Record<string, string>) {
  try {
    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(template),
      llm,
    ]);
    const llmResponse = await chain.invoke(input);
    const message = llmResponse as AIMessage;
    return typeof message.content === "string"
      ? message.content
      : message.content?.toString() ?? "";
  } catch (err) {
    console.log("error encountered: ", err);
    return "no response";
  }
}
