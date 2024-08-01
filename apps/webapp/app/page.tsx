import AuthButton from "@/components/AuthButton";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h1>Split sage</h1>
      <AuthButton />
    </div>
  );
}
