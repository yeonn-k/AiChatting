// src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const users: { email: string; password: string }[] = [];

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "필수 입력값 누락" });

  const exists = users.find((u) => u.email === email);
  if (exists)
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });

  const hash = await bcrypt.hash(password, 10);
  users.push({ email, password: hash });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

  return res.status(201).json({
    message: "회원가입이 성공적으로 완료되었습니다.",
  });
});

// 로그인
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }

  // 가입 여부 확인
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "가입되지 않은 사용자입니다." });
  }

  // 비밀번호 검증
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
  }

  // 로그인 성공
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(200).json({ message: "로그인 성공", token });
});

// 로그아웃
router.post("/signout", (req, res) => {
  // JWT는 서버 세션이 없으므로 실제 무효화 불가
  // 단순히 응답만 반환 (프론트에서 토큰 삭제)
  return res.status(200).json({ message: "로그아웃 성공" });
});

export default router;
