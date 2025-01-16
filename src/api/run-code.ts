import type { NextApiRequest, NextApiResponse } from "next";
import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { code } = req.body;

        if (!code) {
            res.status(400).json({ error: "No code provided" });
            return;
        }

        const tsFileName = `temp-${Date.now()}.ts`;

        try {
            // Сохраняем TypeScript код во временный файл
            writeFileSync(tsFileName, code);

            // Компилируем TypeScript в JavaScript
            execSync(`tsc ${tsFileName}`);

            // Выполняем скомпилированный JavaScript
            const jsFileName = tsFileName.replace(".ts", ".js");
            const output = execSync(`node ${jsFileName}`).toString();

            res.status(200).json({ output });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        } finally {
            // Удаляем временные файлы
            try {
                unlinkSync(tsFileName);
                unlinkSync(tsFileName.replace(".ts", ".js"));
            } catch {}
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
