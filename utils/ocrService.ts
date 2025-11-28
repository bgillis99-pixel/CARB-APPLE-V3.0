/**
 * OCR Service for VIN Extraction
 * Uses Tesseract.js for web-based OCR
 */

import { createWorker, Worker } from 'tesseract.js';

interface OCRResult {
  success: boolean;
  vin?: string;
  confidence?: number;
  error?: string;
}

/**
 * Extract VIN from image using Tesseract OCR
 */
export async function extractVINFromImage(imageUri: string): Promise<OCRResult> {
  try {
    // Create Tesseract worker
    const worker: Worker = await createWorker('eng', 1, {
      logger: (m) => console.log('[OCR]', m),
    });

    // Process the image
    const { data } = await worker.recognize(imageUri);

    console.log('[OCR] Raw text:', data.text);

    // Extract VIN from OCR text
    const vin = findVINInText(data.text);

    // Cleanup
    await worker.terminate();

    if (vin) {
      return {
        success: true,
        vin,
        confidence: data.confidence,
      };
    } else {
      return {
        success: false,
        error: 'No valid VIN found in image. Please ensure the VIN is clearly visible.',
      };
    }
  } catch (error) {
    console.error('[OCR] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'OCR processing failed',
    };
  }
}

/**
 * Find VIN pattern in OCR text
 * VIN is 17 characters: alphanumeric excluding I, O, Q
 */
function findVINInText(text: string): string | null {
  // Remove whitespace and normalize
  const cleanText = text.toUpperCase().replace(/\s+/g, '');

  // VIN pattern: 17 characters, no I, O, Q
  const vinPattern = /[A-HJ-NPR-Z0-9]{17}/g;
  const matches = cleanText.match(vinPattern);

  if (!matches || matches.length === 0) {
    // Try with some common OCR substitutions
    const correctedText = cleanText
      .replace(/O/g, '0')  // O -> 0
      .replace(/I/g, '1')  // I -> 1
      .replace(/Q/g, '0'); // Q -> 0

    const correctedMatches = correctedText.match(vinPattern);
    if (correctedMatches && correctedMatches.length > 0) {
      return validateAndCleanVIN(correctedMatches[0]);
    }

    return null;
  }

  // Return the first valid VIN
  return validateAndCleanVIN(matches[0]);
}

/**
 * Validate and clean VIN
 */
function validateAndCleanVIN(vin: string): string | null {
  if (vin.length !== 17) return null;

  // Ensure no invalid characters
  if (/[IOQ]/i.test(vin)) return null;

  // Basic VIN validation (position 9 should be check digit, position 10 should be year)
  const checkDigit = vin.charAt(8);
  if (!/^[0-9X]$/i.test(checkDigit)) return null;

  const yearCode = vin.charAt(9);
  const validYearCodes = 'ABCDEFGHJKLMNPRSTVWXY123456789';
  if (!validYearCodes.includes(yearCode.toUpperCase())) return null;

  return vin;
}

/**
 * Decode VIN to get vehicle information
 * Uses NHTSA API
 */
export async function decodeVIN(vin: string): Promise<{
  year?: string;
  make?: string;
  model?: string;
  error?: string;
}> {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );

    const data = await response.json();

    if (data.Results) {
      const results = data.Results;

      // Extract relevant fields
      const year = results.find((r: any) => r.Variable === 'Model Year')?.Value;
      const make = results.find((r: any) => r.Variable === 'Make')?.Value;
      const model = results.find((r: any) => r.Variable === 'Model')?.Value;

      return { year, make, model };
    }

    return { error: 'Failed to decode VIN' };
  } catch (error) {
    console.error('[VIN Decode] Error:', error);
    return { error: 'VIN decode service unavailable' };
  }
}
