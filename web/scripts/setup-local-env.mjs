/**
 * `.env.local` 이 없을 때만 `.env.example` 을 복사합니다.
 * 실행: cd web && npm run setup-env
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const target = path.join(root, ".env.local");
const example = path.join(root, ".env.example");

if (fs.existsSync(target)) {
  console.log("`.env.local` 이 이미 있어서 덮어쓰지 않았습니다.");
  process.exit(0);
}

if (!fs.existsSync(example)) {
  console.error("`.env.example` 을 찾을 수 없습니다.");
  process.exit(1);
}

fs.copyFileSync(example, target);
console.log("✓ `.env.example` → `.env.local` 복사했습니다.");
console.log("");
console.log("다음 단계:");
console.log("  1) `.env.local` 을 열어 Supabase 키와 ADMIN_* 값을 채우세요.");
console.log("  2) 관리자 비번 해시: npm run hash-password -- '원하는비밀번호'");
console.log("  3) 점검: npm run check-env");
