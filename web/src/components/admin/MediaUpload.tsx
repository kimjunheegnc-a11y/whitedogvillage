"use client";

import { useState } from "react";

export function MediaUpload() {
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-2 flex flex-col gap-2 rounded-xl border border-pink-100 bg-pink-50/40 p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
          const fd = new FormData(e.currentTarget);
          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: fd,
          });
          const data = (await res.json()) as { error?: string };
          if (!res.ok) throw new Error(data.error ?? "업로드 실패");
          setMsg("업로드 완료");
          (e.currentTarget as HTMLFormElement).reset();
        } catch (err) {
          setMsg(err instanceof Error ? err.message : "오류");
        } finally {
          setLoading(false);
        }
      }}
    >
      <p className="text-sm font-bold text-pink-700">이미지 업로드</p>
      <input required type="file" name="file" accept="image/*" className="text-sm" />
      <input name="alt" placeholder="대체 텍스트" className="rounded border px-2 py-1 text-sm" />
      <input name="sort_order" type="number" placeholder="순서 (숫자)" className="rounded border px-2 py-1 text-sm" />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
      >
        {loading ? "업로드 중…" : "업로드"}
      </button>
      {msg ? <p className="text-xs text-pink-700">{msg}</p> : null}
    </form>
  );
}
