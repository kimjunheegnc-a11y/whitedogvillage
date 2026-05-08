"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-50"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin";
      }}
    >
      로그아웃
    </button>
  );
}
