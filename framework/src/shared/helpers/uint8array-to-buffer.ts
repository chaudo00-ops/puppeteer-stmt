import { Buffer } from "buffer"; // If using ES modules

export function uint8ArrayToBuffer(data: Uint8Array) {
	// Ensure input is a Uint8Array
	if (!(data instanceof Uint8Array)) {
		throw new Error("Input must be an instance of Uint8Array");
	}

	// Convert Uint8Array to Buffer
	return Buffer.from(data);
}
