import { APITester } from "../APITester";

export function Home() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-5xl font-bold my-4 leading-tight">Home</h1>
      <p className="mb-8">
        Welcome to the Bun + React application with routing!
      </p>
      <APITester />
    </div>
  );
}
