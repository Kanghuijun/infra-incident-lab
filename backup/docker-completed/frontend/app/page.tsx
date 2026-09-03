"use client";

import { FormEvent, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomePage() {
  const [health, setHealth] = useState<"checking" | "ok" | "fail">("checking");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    try {
      const healthRes = await fetch(`${API}/api/health`);
      setHealth(healthRes.ok ? "ok" : "fail");

      const postsRes = await fetch(`${API}/api/posts`);
      if (!postsRes.ok) throw new Error("게시글 조회 실패");
      setPosts(await postsRes.json());
      setError("");
    } catch {
      setHealth("fail");
      setError("백엔드 또는 DB에 연결하지 못했습니다. README의 실행 순서를 확인하세요.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const res = await fetch(`${API}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
      setError("글 등록에 실패했습니다.");
      return;
    }
    setTitle("");
    setContent("");
    await load();
  }

  return (
    <main className="wrap">
      <div className="badge">Backup · Docker 완료본</div>
      <h1>StudyBoard</h1>
      <p className="lead">
        Docker까지 완료된 비상용 스냅샷입니다. Nginx는 없습니다.
      </p>

      <section className="status">
        <div className="card">
          <strong>Frontend</strong>
          localhost:3000
        </div>
        <div className="card">
          <strong>Backend health</strong>
          <span className={health === "ok" ? "ok" : "bad"}>
            {health === "checking" ? "확인 중..." : health === "ok" ? "정상" : "실패"}
          </span>
        </div>
        <div className="card">
          <strong>API Base</strong>
          {API}
        </div>
      </section>

      <form onSubmit={onSubmit}>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">글 등록 (DB 저장 확인용)</button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      <h2>게시글</h2>
      <div className="list">
        {posts.map((post) => (
          <article className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <time>{new Date(post.createdAt).toLocaleString("ko-KR")}</time>
          </article>
        ))}
      </div>
    </main>
  );
}
