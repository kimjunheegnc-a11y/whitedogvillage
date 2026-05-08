import Image from "next/image";
import Link from "next/link";

/** naturalcore 스타일: 이미지 + 제목 + 요약 + MORE */
export function NaturalCard({
  href,
  title,
  summary,
  imageSrc,
  imageAlt,
}: {
  href: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-sm ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={href} className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--accent-2)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-[var(--text)]">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{summary}</p>
        <Link
          href={href}
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold text-[var(--accent-dark)] underline-offset-4 hover:underline"
        >
          MORE <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
