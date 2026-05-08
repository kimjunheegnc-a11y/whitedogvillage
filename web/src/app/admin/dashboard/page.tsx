import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  deleteMediaAsset,
  deleteReview,
  saveContentFromForm,
  saveHeroBadges,
  updateReservationFromForm,
  upsertReview,
} from "@/app/admin/dashboard/actions";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { getSessionCookieName, verifyAdminSession } from "@/lib/session";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { asStringArray, asText } from "@/lib/json-content";
import { publicMediaUrl } from "@/lib/storage-url";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!(await verifyAdminSession(token))) {
    redirect("/admin");
  }

  let sb;
  try {
    sb = createAdminSupabase();
  } catch {
    return (
      <div className="p-8 text-center text-red-600">
        Supabase 서비스 키가 설정되지 않았습니다. `.env.local`을 확인하세요.
      </div>
    );
  }

  const { data: blocks } = await sb.from("content_blocks").select("key, value");
  const map: Record<string, unknown> = {};
  for (const row of blocks ?? []) {
    map[row.key as string] = row.value;
  }

  const { data: media } = await sb.from("media_assets").select("*").order("sort_order", { ascending: true });
  const { data: reservations } = await sb
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  const { data: inquiries } = await sb
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  const { data: reviews } = await sb.from("reviews").select("*").order("sort_order", { ascending: true });

  const textFields: { key: string; label: string }[] = [
    { key: "hero_title", label: "히어로 제목" },
    { key: "hero_subtitle", label: "히어로 부제" },
    { key: "phone", label: "대표 전화" },
    { key: "contact_address", label: "주소" },
    { key: "contact_hours", label: "영업시간 문구" },
    { key: "page_bunyang_intro", label: "분양 페이지 소개" },
    { key: "page_hotel_intro", label: "호텔 페이지 소개" },
    { key: "page_grooming_intro", label: "미용 페이지 소개" },
    { key: "page_hospital_intro", label: "병원 페이지 소개" },
    { key: "page_snacks_intro", label: "간식 페이지 소개" },
  ];

  const badgesStr = asStringArray(map["hero_badges"], []).join("\n");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-700">관리자 대시보드</h1>
          <p className="text-sm text-muted">콘텐츠 · 이미지 · 후기 · 예약/문의</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold">
            사이트 보기
          </Link>
          <LogoutButton />
        </div>
      </div>

      <section className="mt-10 rounded-3xl bg-white p-6 shadow ring-1 ring-pink-100">
        <h2 className="text-lg font-bold text-pink-700">텍스트 콘텐츠</h2>
        <div className="mt-6 space-y-8">
          {textFields.map((f) => (
            <form key={f.key} action={saveContentFromForm} className="grid gap-2">
              <input type="hidden" name="key" value={f.key} />
              <label className="text-sm font-semibold text-text">{f.label}</label>
              <textarea
                name="value"
                rows={f.key.includes("intro") ? 4 : 2}
                defaultValue={asText(map[f.key], "")}
                className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-fit rounded-full bg-accent px-4 py-2 text-xs font-bold text-white"
              >
                저장
              </button>
            </form>
          ))}
          <form action={saveHeroBadges} className="grid gap-2">
            <label className="text-sm font-semibold text-text">히어로 해시태그 (줄바꿈 또는 쉼표)</label>
            <textarea
              name="hero_badges"
              rows={4}
              defaultValue={badgesStr}
              className="rounded-xl border border-pink-100 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="w-fit rounded-full bg-accent px-4 py-2 text-xs font-bold text-white"
            >
              해시태그 저장
            </button>
          </form>
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-white p-6 shadow ring-1 ring-pink-100">
        <h2 className="text-lg font-bold text-pink-700">갤러리 이미지</h2>
        <MediaUpload />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {(media ?? []).map((m) => (
            <div key={m.id} className="rounded-2xl border border-pink-100 p-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-pink-50">
                <Image
                  src={publicMediaUrl(m.path)}
                  alt={m.alt ?? ""}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <p className="mt-2 truncate text-xs text-muted">{m.path}</p>
              <form action={deleteMediaAsset.bind(null, m.id)} className="mt-2">
                <button
                  type="submit"
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  삭제
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-white p-6 shadow ring-1 ring-pink-100">
        <h2 className="text-lg font-bold text-pink-700">예약</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-pink-100 text-muted">
                <th className="py-2 pr-4">일시</th>
                <th className="py-2 pr-4">유형</th>
                <th className="py-2 pr-4">이름</th>
                <th className="py-2 pr-4">연락처</th>
                <th className="py-2 pr-4">상태</th>
              </tr>
            </thead>
            <tbody>
              {(reservations ?? []).map((r) => (
                <tr key={r.id} className="border-b border-pink-50 align-top">
                  <td className="py-2 pr-4 text-xs text-muted">
                    {new Date(r.created_at).toLocaleString("ko-KR")}
                  </td>
                  <td className="py-2 pr-4">{r.type}</td>
                  <td className="py-2 pr-4">{r.customer_name}</td>
                  <td className="py-2 pr-4">{r.phone}</td>
                  <td className="py-2 pr-4">
                    <form action={updateReservationFromForm} className="flex flex-col gap-1">
                      <input type="hidden" name="id" value={r.id} />
                      <select
                        name="status"
                        defaultValue={r.status}
                        className="rounded border border-pink-100 px-2 py-1 text-xs"
                      >
                        {["new", "confirmed", "cancelled", "done"].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full bg-pink-50 px-2 py-1 text-xs font-bold text-pink-700"
                      >
                        저장
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(reservations ?? []).length === 0 ? (
            <p className="mt-4 text-sm text-muted">예약이 없습니다.</p>
          ) : null}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-white p-6 shadow ring-1 ring-pink-100">
        <h2 className="text-lg font-bold text-pink-700">문의</h2>
        <div className="mt-4 space-y-4">
          {(inquiries ?? []).length === 0 ? (
            <p className="text-sm text-muted">문의가 없습니다.</p>
          ) : (
            (inquiries ?? []).map((q) => (
              <div key={q.id} className="rounded-2xl border border-pink-50 bg-pink-50/30 p-4 text-sm">
                <p className="font-bold text-pink-700">
                  {q.category} · {q.name} · {q.phone}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-muted">{q.message}</p>
                <p className="mt-2 text-xs text-muted">
                  {new Date(q.created_at).toLocaleString("ko-KR")}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-white p-6 shadow ring-1 ring-pink-100">
        <h2 className="text-lg font-bold text-pink-700">후기</h2>
        <form action={upsertReview} className="mt-4 grid gap-2 rounded-2xl border border-dashed border-pink-200 p-4">
          <p className="text-sm font-semibold">새 후기</p>
          <input name="title" placeholder="제목" className="rounded border px-2 py-1 text-sm" />
          <textarea required name="body" placeholder="본문" rows={3} className="rounded border px-2 py-1 text-sm" />
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-1">
              별점
              <select name="rating" defaultValue="5" className="rounded border px-2 py-1">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" name="published" defaultChecked />
              노출
            </label>
            <input name="sort_order" type="number" placeholder="순서" className="w-24 rounded border px-2 py-1" />
          </div>
          <button type="submit" className="w-fit rounded-full bg-accent px-4 py-2 text-xs font-bold text-white">
            추가
          </button>
        </form>

        <div className="mt-8 space-y-6">
          {(reviews ?? []).map((r) => (
            <div key={r.id} className="rounded-2xl border border-pink-100 p-4">
              <form action={upsertReview} className="grid gap-2">
                <input type="hidden" name="id" value={r.id} />
                <input name="title" defaultValue={r.title ?? ""} className="rounded border px-2 py-1 text-sm" />
                <textarea
                  name="body"
                  rows={3}
                  defaultValue={r.body}
                  className="rounded border px-2 py-1 text-sm"
                />
                <div className="flex flex-wrap gap-3 text-sm">
                  <select name="rating" defaultValue={String(r.rating ?? 5)} className="rounded border px-2 py-1">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" name="published" defaultChecked={r.published} />
                    노출
                  </label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={r.sort_order}
                    className="w-24 rounded border px-2 py-1"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-white">
                    저장
                  </button>
                </div>
              </form>
              <form action={deleteReview.bind(null, r.id)} className="mt-2">
                <button type="submit" className="text-xs font-bold text-red-600 hover:underline">
                  삭제
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
