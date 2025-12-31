import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <main className="max-w-xl mx-auto">
        {/* ドラゴンボールロゴ風タイトル */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold tracking-wider"
            style={{
              color: "#ff6b00",
              textShadow: `
                3px 3px 0 #000,
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                4px 4px 0 #ffeb3b
              `,
              letterSpacing: "0.1em",
            }}
          >
            TODO BALL
          </h1>
          <p
            className="text-xl mt-2"
            style={{
              color: "#1e88e5",
              textShadow: "2px 2px 0 #000",
            }}
          >
            7つのタスクを集めろ！
          </p>
        </div>

        {/* ドラゴンボール装飾 */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((stars) => (
            <div
              key={stars}
              className="w-8 h-8 rounded-full relative"
              style={{
                background: "linear-gradient(135deg, #ffeb3b 0%, #ff9800 50%, #ff6b00 100%)",
                border: "2px solid #000",
                boxShadow: "2px 2px 0 #000",
                animation: "twinkle 2s ease-in-out infinite",
                animationDelay: `${stars * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-600 text-xs font-bold">{stars > 4 ? "★" : "☆"}</span>
              </div>
            </div>
          ))}
        </div>

        <TodoList />
      </main>
    </div>
  );
}
