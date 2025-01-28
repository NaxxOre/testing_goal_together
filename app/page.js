"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Video Platform</h1>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Admin Panel</Link>
          </li>
          <li>
            <Link href="/client">Client Panel</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
