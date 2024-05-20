import { AddCardForm } from "@/feature/create-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#DEDEDE]">
      <AddCardForm />
    </main>
  );
}
