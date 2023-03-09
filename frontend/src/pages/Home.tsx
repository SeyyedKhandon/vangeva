import Posts from "@/components/Posts";

export default function Home() {
  return (
    <section className="mx-4">
      <Posts url="/api/posts" isProtected={false} />
    </section>
  );
}
