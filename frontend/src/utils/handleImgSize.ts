export const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_DIM = 512;

export function validateImage(file: File) {
  if (!ALLOWED.includes(file.type))
    throw new Error("JPG/PNG/WEBP만 업로드 가능해요.");
  if (file.size > MAX_FILE_SIZE)
    throw new Error("파일은 최대 5MB까지 가능합니다.");
}

export async function fileToImageBitmap(file: File) {
  const blob = file.slice(0, file.size, file.type);
  return await createImageBitmap(blob);
}

export async function resizeToWebp(
  file: File,
  maxDim = MAX_DIM,
  quality = 0.85
) {
  validateImage(file);

  const bmp = await fileToImageBitmap(file);
  const { width, height } = bmp;

  const scale = Math.min(1, maxDim / Math.max(width, height));
  const outW = Math.max(1, Math.round(width * scale));
  const outH = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bmp, 0, 0, outW, outH);
  bmp.close?.();

  const blob: Blob = await new Promise((res) =>
    canvas.toBlob((b) => res(b as Blob), "image/webp", quality)
  );

  const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
    type: "image/webp",
  });

  //preview
  const previewUrl = URL.createObjectURL(blob);
  return { webpFile, previewUrl, blob };
}
