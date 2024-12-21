import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="bg-violet-600">
      Andry
      <UserButton />
    </main>
  );
}
