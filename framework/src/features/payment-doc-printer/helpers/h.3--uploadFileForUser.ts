import { promises as fs } from "fs";
import path from "path";

/**
 * Upload/save file for user locally
 * This is a local file system implementation for development and testing
 */
export async function uploadFileForUser(
	sub_acc_id: string,
	filename: string,
	file: { buffer: Buffer },
	_metadata?: any,
	_access_level?: "public" | "private",
): Promise<{ new_file_name: string; file_path: string }> {
	// Create output directory for PDFs
	const outputDir = path.join(__dirname, "../../../../../puppeteer/output-pdfs");

	// Ensure output directory exists
	try {
		await fs.mkdir(outputDir, { recursive: true });
	} catch (err) {
		// Directory already exists, ignore error
	}

	// Create full file path
	const filePath = path.join(outputDir, filename);

	// Write the PDF file
	await fs.writeFile(filePath, file.buffer);

	console.log(`✓ PDF saved locally: ${filePath}`);

	return {
		new_file_name: filename,
		file_path: filePath,
	};
}
