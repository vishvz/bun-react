export function About() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <h1 className="text-5xl font-bold my-4 leading-tight">About</h1>
      <p className="text-lg mb-4">
        This is a Bun + React application demonstrating React Router setup.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        <ul className="text-left space-y-2">
          <li>• <strong>Bun</strong> - Fast JavaScript runtime and package manager</li>
          <li>• <strong>React 19</strong> - UI library</li>
          <li>• <strong>React Router</strong> - Client-side routing</li>
          <li>• <strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
          <li>• <strong>TypeScript</strong> - Type safety</li>
        </ul>
      </div>
    </div>
  );
}
