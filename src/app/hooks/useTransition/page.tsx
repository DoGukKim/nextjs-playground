"use client";
import { memo, useState, useTransition } from "react";

const SlowItem = memo(({ text }: { text: string }) => {
  Array.from({ length: 5000 }, (_, i) => Math.sqrt(i));
  return <li>{text}</li>;
});
SlowItem.displayName = "SlowItem";

const PostsTab = () => {
  const items = Array.from({ length: 500 }, (_, i) => `게시물 #${i + 1}`);
  return (
    <ul>
      {items.map((item, i) => (
        <SlowItem key={i} text={item} />
      ))}
    </ul>
  );
};

const ContactTab = () => <div>연락처 탭 내용</div>;
const AboutTab = () => <div>소개 탭 내용</div>;

const UseTransitionPage = () => {
  const [tab, setTab] = useState("about");
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (nextTab: string) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <h1>useTransition 예제</h1>
      <p>Posts 탭을 클릭해보세요 (무거운 렌더링)</p>

      <div>
        <button
          onClick={() => handleTabClick("about")}
          style={{ fontWeight: tab === "about" ? "bold" : "normal" }}
        >
          About
        </button>
        <button
          onClick={() => handleTabClick("posts")}
          style={{ fontWeight: tab === "posts" ? "bold" : "normal" }}
        >
          Posts (느림)
        </button>
        <button
          onClick={() => handleTabClick("contact")}
          style={{ fontWeight: tab === "contact" ? "bold" : "normal" }}
        >
          Contact
        </button>
      </div>

      {isPending && <div>로딩 중...</div>}

      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        {tab === "about" && <AboutTab />}
        {tab === "posts" && <PostsTab />}
        {tab === "contact" && <ContactTab />}
      </div>
    </div>
  );
};

export default UseTransitionPage;
