import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

/** ---------------------------
 * 업로드 디렉터리 (프로젝트 루트 기준)
 *  - dev(ts-node-dev), prod(tsc) 동일 경로 사용을 위해 process.cwd() 사용
 * --------------------------*/
const uploadRoot = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadRoot)) fs.mkdirSync(uploadRoot, { recursive: true });

/** ---------------------------
 * multer 설정
 * --------------------------*/
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadRoot),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/** ---------------------------
 * 인증 미들웨어 (JWT)
 * --------------------------*/
function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰 없음" });
  }
  try {
    req.user = jwt.verify(
      auth.split(" ")[1],
      process.env.JWT_SECRET || "secret"
    );
    next();
  } catch {
    return res.status(401).json({ message: "유효하지 않은 토큰" });
  }
}

/** ---------------------------
 * 메모리 스토어 (서버 재시작 시 초기화)
 * --------------------------*/
type Character = {
  id: string;
  name: string;
  prompt: string;
  imgUrl: string | null; // 예: "/uploads/xxx.jpg"
  ownerId?: string;
  createdAt: string;
};
const characters: Character[] = [];

/** ---------------------------
 * 캐릭터 생성
 * POST /addchar
 * form-data: name, prompt, image(file)
 * --------------------------*/
router.post("/", requireAuth, upload.single("image"), (req: any, res) => {
  const { name, prompt } = req.body as { name?: string; prompt?: string };

  if (!name || !prompt) {
    return res.status(400).json({ message: "name, prompt 필수" });
  }

  const file = req.file;
  const imgUrl = file ? `/uploads/${file.filename}` : null;

  const ownerId = (req.user as any)?.id ?? (req.user as any)?.email ?? "anon";
  const char: Character = {
    id: Date.now().toString(),
    name,
    prompt,
    imgUrl,
    ownerId,
    createdAt: new Date().toISOString(),
  };

  characters.push(char);
  return res.status(201).json({ message: "캐릭터 생성 완료", character: char });
});

/** ---------------------------
 * 내 캐릭터 목록
 * GET /addchar
 * --------------------------*/
router.get("/", requireAuth, (req: any, res) => {
  const ownerId = (req.user as any)?.id ?? (req.user as any)?.email ?? "anon";
  const mine = characters.filter((c) => c.ownerId === ownerId);
  res.json({ items: mine });
});

/** ---------------------------
 * 단건 조회
 * GET /addchar/:id
 * --------------------------*/
router.get("/:id", requireAuth, (req, res) => {
  const char = characters.find((c) => c.id === req.params.id);
  if (!char) return res.status(404).json({ message: "캐릭터가 없습니다." });
  res.json(char);
});

export default router;
