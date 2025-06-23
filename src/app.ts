import express from "express";
import multer from "multer";
import fs from "fs";
import { parseEml } from "./eml/emailParser";
import { generateReport } from "./engine/reportGenerator";
import { loadRules } from "./engine/loadRules";

const app = express();
app.use(express.json());

const upload = multer({ dest: `uploads/` });

app.post("/email/audit", upload.single("email"), async (req, res) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const { text, hasImageAttachment } = await parseEml(filePath);
    if (!hasImageAttachment) {
      res
        .status(400)
        .json({ error: "Email must contain at least one image attachment." });
      return;
    }

    const rules = await loadRules();
    const results = await Promise.all(rules.map((rule) => rule.evaluate(text)));
    const report = await generateReport(results);
    fs.unlinkSync(filePath);

    res.json(report);
  } catch (error) {
    res
      .status(500)
      .send("Failed to serve request, unexpected error. Please try again");
  }
});

const PORT = process.env.PORT || 3049;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
