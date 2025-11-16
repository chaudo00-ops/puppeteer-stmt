# Ghostscript PDF Optimization with Font Subsetting

This document explains how to use Ghostscript post-processing to significantly reduce PDF file sizes through aggressive font subsetting.

## What is Font Subsetting?

Font subsetting is the process of extracting only the characters actually used in a document from a font file, rather than embedding the entire font. For billing statements, this is especially effective because:

- **Limited character set**: Billing statements typically use only numbers (0-9), basic punctuation, and common words
- **Repetitive content**: Same labels and formats across multiple pages
- **CJK fonts**: Chinese/Japanese/Korean fonts can be 5-15 MB; subsetting reduces them to only the characters used (~0.5 KB per character)

**Example savings**:
- Full font embedding: 2-15 MB per font
- Subsetted font: Only characters used (typically 50-200 characters × 0.5 KB = 25-100 KB)
- **Reduction: 95-99% for font data alone**

## Recent Changes

### Logo Update
- **Changed from**: `logo-optimized.png` (12 KB, resized to 240px)
- **Changed to**: `logo-transparent.png` (257 KB, original quality)
- **Location**: `generate-billing-pdf.ts:439`

The original high-quality logo is now used in PDFs. While this increases the embedded image size, the Ghostscript optimization will handle image compression alongside font subsetting.

## Installation

### Install Ghostscript

**macOS:**
```bash
brew install ghostscript
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install ghostscript
```

**Windows:**
Download from [Ghostscript Downloads](https://www.ghostscript.com/download/gsdnld.html)

### Verify Installation

```bash
gs --version
# Should output version number (e.g., 10.0.0)
```

## Usage

### Option 1: Generate and Optimize in One Command

```bash
npm run generate-and-optimize
```

This will:
1. Generate all 7 language PDFs with the original logo
2. Optimize each PDF with Ghostscript font subsetting
3. Create `*-gs-optimized.pdf` versions

### Option 2: Optimize Existing PDFs

If you already have PDFs generated:

```bash
npm run optimize-pdf
```

### Option 3: Manual Steps

```bash
# 1. Generate PDFs
npm run generate-pdf

# 2. Optimize with Ghostscript
npm run optimize-pdf
```

## How It Works

The `ghostscript-optimize.ts` script processes PDFs with these Ghostscript settings:

```bash
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -dNOPAUSE \
   -dQUIET \
   -dBATCH \
   -dSubsetFonts=true \        # ⭐ Only embed used characters
   -dCompressFonts=true \       # ⭐ Compress font data
   -dEmbedAllFonts=true \       # ⭐ Ensure fonts are embedded
   -dDetectDuplicateImages=true \
   -dCompressPages=true \
   -sOutputFile=output.pdf \
   input.pdf
```

### Key Settings Explained

| Setting | Purpose | Impact |
|---------|---------|--------|
| `-dSubsetFonts=true` | **Critical**: Only embed characters actually used | 95-99% font size reduction |
| `-dCompressFonts=true` | Compress the subsetted font data | Additional 10-30% reduction |
| `-dEmbedAllFonts=true` | Ensure fonts are embedded (required for subsetting) | Maintains visual fidelity |
| `-dPDFSETTINGS=/ebook` | Balanced quality/size preset (150 DPI images) | Good for screen viewing |
| `-dDetectDuplicateImages=true` | Remove duplicate logo/image instances | Saves space when logo appears on multiple pages |
| `-dCompressPages=true` | Compress page content streams | Additional 5-15% reduction |

### Alternative PDFSETTINGS

You can modify the script to use different quality presets:

- `/screen` - Lowest file size (72 DPI) - best for email
- `/ebook` - Balanced (150 DPI) - **default, recommended**
- `/printer` - High quality (300 DPI) - for printing
- `/prepress` - Highest quality (300 DPI, CMYK) - for commercial printing

## Output Files

Generated PDFs are saved to `src/output-pdfs/`:

```
generated-billing-statement-en.pdf              # Original (with original logo)
generated-billing-statement-en-gs-optimized.pdf # Ghostscript optimized
generated-billing-statement-zh-TW.pdf
generated-billing-statement-zh-TW-gs-optimized.pdf
... (and 5 more language pairs)
```

## Expected Results

### File Size Comparison

For a typical billing statement:

| Version | Approximate Size | Notes |
|---------|-----------------|-------|
| **Original (with logo-transparent.png)** | 300-500 KB | Full font embedding + original logo |
| **Ghostscript Optimized** | 50-150 KB | **60-80% reduction** via font subsetting + image optimization |

### Character Usage Example

For a billing statement with:
- English text: ~50 unique characters (A-Z, a-z, 0-9, punctuation)
- Chinese text: ~200 unique characters (common billing terms)

**Without subsetting**:
- English font: ~200 KB (full charset)
- Chinese font: ~8 MB (full CJK charset)
- **Total**: ~8.2 MB in fonts alone

**With subsetting**:
- English font: ~25 KB (50 chars × 0.5 KB)
- Chinese font: ~100 KB (200 chars × 0.5 KB)
- **Total**: ~125 KB in fonts
- **Savings**: ~8 MB → ~125 KB = **98.5% reduction**

## Optimization Summary Output

After running optimization, you'll see:

```
================================================================================
📊 OPTIMIZATION SUMMARY (Ghostscript with Font Subsetting)
================================================================================

generated-billing-statement-en.pdf:
  Original:  412.34 KB
  Optimized: 87.56 KB
  Reduction: 324.78 KB (78.76%)

generated-billing-statement-zh-TW.pdf:
  Original:  8.45 MB
  Optimized: 156.23 KB
  Reduction: 8.30 MB (98.15%)

... (other languages)

--------------------------------------------------------------------------------
TOTAL:
  Original:  24.67 MB
  Optimized: 891.45 KB
  Reduction: 23.79 MB (96.38%)
================================================================================

✅ All PDFs optimized successfully!

💡 Font subsetting keeps only the characters actually used in the document,
   which is especially effective for billing statements with limited character sets.
```

## Troubleshooting

### Ghostscript not found

```bash
# Check if installed
gs --version

# If not found, install (see Installation section above)
```

### Permission errors

Ensure the `src/output-pdfs/` directory exists and is writable:

```bash
mkdir -p src/output-pdfs
chmod 755 src/output-pdfs
```

### Large file sizes after optimization

If optimized files are still large:

1. **Check font usage**: Run `analyze-characters.ts` to see unique character count
2. **Try stricter settings**: Change `-dPDFSETTINGS=/ebook` to `/screen` in `ghostscript-optimize.ts`
3. **Verify subsetting**: Open PDF in Adobe Acrobat → File → Properties → Fonts → check for "(subset)" suffix

### Quality issues

If text looks blurry after optimization:

1. **Use higher DPI**: Change to `-dPDFSETTINGS=/printer` (300 DPI)
2. **Check font rendering**: Ensure `-dEmbedAllFonts=true` is set

## Additional Scripts

This repository includes several PDF optimization tools:

| Script | Purpose | Command |
|--------|---------|---------|
| `generate-billing-pdf.ts` | Generate PDFs with Puppeteer | `npm run generate-pdf` |
| `ghostscript-optimize.ts` | **New**: Ghostscript with font subsetting | `npm run optimize-pdf` |
| `compress-pdfs.ts` | Legacy: pdf-lib compression | `tsx compress-pdfs.ts` |
| `optimize-logo.ts` | Optimize logo PNG (not needed for PDFs now) | `tsx optimize-logo.ts` |
| `analyze-characters.ts` | Analyze character usage in PDFs | `tsx analyze-characters.ts` |

## Technical Details

### Font Subsetting Process

1. **Ghostscript scans** the PDF and identifies all glyphs (character shapes) actually rendered
2. **Extracts only those glyphs** from the embedded fonts
3. **Creates new subsetted fonts** containing only the used characters
4. **Re-embeds** the smaller fonts into the PDF
5. **Compresses** the font data using DEFLATE

### Why This Works for Billing Statements

Billing statements are ideal candidates for font subsetting because:

1. **Repetitive vocabulary**: Limited unique words (e.g., "Invoice", "Total", "Amount", "Date")
2. **Numeric heavy**: Numbers 0-9 + currency symbols = ~15 characters
3. **Formatted text**: Tables and labels reuse same characters
4. **No dynamic content**: Fixed template structure
5. **Multi-language efficiency**: Even CJK documents use limited character sets for business terms

### Comparison with Other Methods

| Method | Font Handling | Typical Reduction | Speed | Quality |
|--------|---------------|-------------------|-------|---------|
| **Ghostscript subsetting** | ⭐ Extracts only used chars | 60-98% | Fast | Excellent |
| pdf-lib compression | Object stream compression | 10-30% | Very fast | Lossless |
| Image optimization (Sharp) | N/A (images only) | Logo: 95% | Fast | Configurable |
| QPDF linearization | Reorganizes PDF structure | 5-15% | Very fast | Lossless |

**Recommended workflow**: Use Ghostscript subsetting as the primary optimization, it handles fonts, images, and structure in one pass.

## Advanced Configuration

### Custom Ghostscript Settings

Edit `ghostscript-optimize.ts` to customize optimization:

```typescript
const gsCommand = [
  "gs",
  "-sDEVICE=pdfwrite",
  "-dCompatibilityLevel=1.4",
  "-dPDFSETTINGS=/screen",  // ← Change quality preset here
  // ... other settings
];
```

### Preserve Original Quality

For archival purposes, use maximum quality:

```typescript
"-dPDFSETTINGS=/prepress",
"-dColorImageResolution=300",
"-dGrayImageResolution=300",
```

### Aggressive Compression

For minimal file size (email-friendly):

```typescript
"-dPDFSETTINGS=/screen",
"-dColorImageResolution=72",
"-dGrayImageResolution=72",
```

## References

- [Ghostscript Documentation](https://www.ghostscript.com/doc/current/Use.htm)
- [PDF Font Subsetting Explained](https://stackoverflow.com/questions/tagged/font-subsetting)
- [Puppeteer PDF Generation](https://pptr.dev/api/puppeteer.page.pdf)

## Support

For issues or questions:
1. Check Ghostscript version: `gs --version` (requires 9.50+)
2. Review optimization logs in terminal output
3. Compare file sizes before/after optimization
4. Verify font subsetting: Open PDF → Properties → Fonts tab

---

**Last updated**: 2025-11-16
**Ghostscript version tested**: 10.0+
