import { execFile } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const GHOSTSCRIPT_ARGS = [
	"-sDEVICE=pdfwrite",
	"-dCompatibilityLevel=1.4",
	"-dPDFSETTINGS=/screen",
	"-dNOPAUSE",
	"-dQUIET",
	"-dBATCH",
	"-dSubsetFonts=true",
	"-dCompressFonts=true",
	"-dEmbedAllFonts=true",
	"-dDetectDuplicateImages=true",
	"-dCompressPages=true",
	"-dAutoRotatePages=/None",
	"-dDownsampleImages=true",
	"-dDownsampleColorImages=true",
	"-dDownsampleGrayImages=true",
	"-dDownsampleMonoImages=true",
	"-dColorImageDownsampleType=/Bicubic",
	"-dGrayImageDownsampleType=/Bicubic",
	"-dMonoImageDownsampleType=/Bicubic",
	"-dColorImageResolution=150",
	"-dGrayImageResolution=150",
	"-dMonoImageResolution=300",
	"-dColorImageFilter=/DCTEncode",
	"-dGrayImageFilter=/DCTEncode",
];

let ghostscriptCheck: Promise<boolean> | undefined;

async function hasGhostscript(): Promise<boolean> {
	if (!ghostscriptCheck) {
		ghostscriptCheck = execFileAsync("gs", ["--version"], {
			windowsHide: true,
		})
			.then(() => true)
			.catch(() => false);
	}
	return ghostscriptCheck;
}

function buildGhostscriptArgs(inputPath: string, outputPath: string): string[] {
	return [...GHOSTSCRIPT_ARGS, `-sOutputFile=${outputPath}`, inputPath];
}

async function runGhostscript(inputPath: string, outputPath: string): Promise<void> {
	const args = buildGhostscriptArgs(inputPath, outputPath);
	await execFileAsync("gs", args, {
		windowsHide: true,
		maxBuffer: 5 * 1024 * 1024,
	});
}

export async function optimizePdfBuffer(pdf: Uint8Array): Promise<Uint8Array> {
	const available = await hasGhostscript();
	if (!available) {
		return pdf;
	}

	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "billing-pdf-opt-"));
	const inputPath = path.join(tempDir, "input.pdf");
	const outputPath = path.join(tempDir, "optimized.pdf");

	try {
		await fs.writeFile(inputPath, pdf);
		await runGhostscript(inputPath, outputPath);
		const optimizedBytes = await fs.readFile(outputPath);
		return new Uint8Array(optimizedBytes);
	} catch (error) {
		console.warn("[billing-statement] Ghostscript optimization failed:", error);
		return pdf;
	} finally {
		await fs.rm(tempDir, { recursive: true, force: true });
	}
}
