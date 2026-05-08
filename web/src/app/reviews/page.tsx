import Link from "next/link";
import { loadPublishedReviews } from "@/lib/content-load";

export default async function ReviewsPage() {
  const reviews = await loadPublishedReviews();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold text-pink-600">후기</p>
      <h1 className="mt-2 text-3xl font-extrabold text-pink-700">고객 후기</h1>
      <p className="mt-4 text-muted">매장을 이용해 주신 고객님의 이야기입니다.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {reviews.length === 0 ? (
          <p className="text-sm text-muted">등록된 후기가 없습니다.</p>
        ) : (
          reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-pink-100"
            >
              <h2 className="text-lg font-bold text-pink-700">{r.title || "후기"}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{r.body}</p>
              {r.rating ? (
                <p className="mt-4 text-xs font-semibold text-pink-500">★ {r.rating}.0</p>
              ) : null}
            </article>
          ))
        )}
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/" className="text-pink-600 hover:underline">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}
