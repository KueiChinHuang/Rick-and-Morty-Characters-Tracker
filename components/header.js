import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/api/login">
        <a>Login</a>
      </Link>
      <Link href="/api/logout">
        <a>Login</a>
      </Link>
    </div>
  );
}
