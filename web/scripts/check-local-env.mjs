/**
 * 로컬 `.env.local` 필수 항목 점검 (값 내용은 출력하지 않음).
 * 실행: cd web && npm run check-env
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

function normalizeAdminPasswordHash(raw) {
  if (!raw) return null;
  let h = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\r/g, "")
    .trim();
  if ((h.startsWith('"') && h.endsWith('"')) || (h.startsWith("'") && h.endsWith("'"))) {
    h = h.slice(1, -1).trim();
  }
  if (h.includes("\\$")) {
    h = h.replace(/\\\$/g, "$");
  }
  return h.length > 0 ? h : null;
}

function normalizeAdminPlainPassword(raw) {
  if (!raw) return null;
  let s = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\r/g, "")
    .trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s.length > 0 ? s : null;
}

/** 최소한의 .env 파싱 (따옴표·주석·앞뒤 공백 처리) */
function parseEnvFile(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const PLACEHOLDER_URL = "https://your_project.supabase.co";
const PLACEHOLDER_ANON = "your_anon_key";
const PLACEHOLDER_SERVICE = "your_service_role_key";

function isPlaceholderUrl(v) {
  if (!v) return true;
  const u = v.toLowerCase();
  return u.includes("your_project") || u === PLACEHOLDER_URL;
}

function isPlaceholderKey(v, ph) {
  if (!v) return true;
  return v.toLowerCase() === ph.toLowerCase();
}

let errors = [];
let warns = [];

if (!fs.existsSync(envPath)) {
  console.error("❌ `.env.local` 파일이 없습니다.\n");
  console.error("   다음 중 하나를 실행하세요:\n");
  console.error("   npm run setup-env\n");
  console.error("   또는: cp .env.example .env.local\n");
  process.exit(1);
}

const env = parseEnvFile(fs.readFileSync(envPath, "utf8"));

if (isPlaceholderUrl(env.NEXT_PUBLIC_SUPABASE_URL)) {
  errors.push("NEXT_PUBLIC_SUPABASE_URL — 실제 Supabase URL로 바꾸세요 (YOUR_PROJECT 자리).");
}
if (isPlaceholderKey(env.NEXT_PUBLIC_SUPABASE_ANON_KEY, PLACEHOLDER_ANON)) {
  errors.push("NEXT_PUBLIC_SUPABASE_ANON_KEY — anon 키를 넣으세요.");
}
if (isPlaceholderKey(env.SUPABASE_SERVICE_ROLE_KEY, PLACEHOLDER_SERVICE)) {
  errors.push("SUPABASE_SERVICE_ROLE_KEY — service_role 키를 넣으세요.");
}

const plain = normalizeAdminPlainPassword(env.ADMIN_PASSWORD);
const hash = normalizeAdminPasswordHash(env.ADMIN_PASSWORD_HASH);
if (!plain && !hash) {
  errors.push(
    "ADMIN_PASSWORD 또는 ADMIN_PASSWORD_HASH — 둘 중 하나는 필요합니다. 입장 게이트처럼 평문이면 ADMIN_PASSWORD=0000, bcrypt 는 hash-password 출력을 ADMIN_PASSWORD_HASH 에 넣으세요."
  );
} else if (!plain && hash && !/^\$2[aby]\$\d{2}\$/.test(hash)) {
  errors.push("ADMIN_PASSWORD_HASH — bcrypt 형식이 아닙니다. 평문은 ADMIN_PASSWORD 에 두세요.");
} else if (!plain && hash) {
  const testPwd = process.argv[2];
  if (testPwd) {
    if (!bcrypt.compareSync(testPwd, hash)) {
      warns.push(`ADMIN_PASSWORD_HASH — 전달한 테스트 비밀번호와 일치하지 않습니다. (npm run check-env -- '비번')`);
    } else {
      console.log("✓ ADMIN_PASSWORD_HASH — 테스트 비밀번호와 일치합니다.");
    }
  }
}

const secret = (env.ADMIN_SESSION_SECRET || "").trim();
if (!secret) {
  errors.push("ADMIN_SESSION_SECRET — 비어 있습니다. 32자 이상 임의 문자열을 넣으세요.");
} else if (secret.length < 32) {
  errors.push(`ADMIN_SESSION_SECRET — ${secret.length}자입니다. 32자 이상 필요합니다.`);
}

if (!env.OWNER_EMAIL || env.OWNER_EMAIL === "owner@example.com") {
  warns.push("OWNER_EMAIL — 아직 예시값이면 예약·문의 메일 알림이 실제 주소로 가지 않습니다.");
}

if (errors.length) {
  console.error("로컬 환경 변수 점검 결과: 실패\n");
  for (const e of errors) console.error("  ❌", e);
  console.error("");
  if (warns.length) {
    for (const w of warns) console.warn("  ⚠", w);
    console.warn("");
  }
  process.exit(1);
}

console.log("로컬 환경 변수 점검 결과: 통과\n");
console.log("  ✓ Supabase URL / anon / service_role");
console.log(plain ? "  ✓ ADMIN_PASSWORD (평문)" : "  ✓ ADMIN_PASSWORD_HASH 형식");
console.log("  ✓ ADMIN_SESSION_SECRET 길이 (32자 이상)");
if (!process.argv[2]) {
  console.log("\n  (비밀번호 일치 여부까지 확인하려면: npm run check-env -- '0000')");
}
if (warns.length) {
  console.warn("\n선택 항목 알림:");
  for (const w of warns) console.warn("  ⚠", w);
}
