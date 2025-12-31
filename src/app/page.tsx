import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* 背景の桜の花びら装飾 */}
      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${(i * 8) + 2}%`,
              top: `${(i * 7) % 100}%`,
              animation: `sakura-fall ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <main className="max-w-xl mx-auto relative z-10">
        {/* 和風タイトル */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-8 py-4 rounded-lg mb-4"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #f8f4eb 100%)",
              border: "2px solid #c9a84c",
              boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h1
              className="text-4xl font-bold"
              style={{
                color: "#d14836",
                fontFamily: "'Noto Serif JP', serif",
                letterSpacing: "0.2em",
              }}
            >
              予定帳
            </h1>
            <p
              className="text-sm mt-1"
              style={{
                color: "#264c6e",
                fontFamily: "'Noto Serif JP', serif",
              }}
            >
              Todo Ball - 和風版
            </p>
          </div>

          <p
            className="text-lg"
            style={{
              color: "#264c6e",
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            花のように美しく、一日を整えましょう
          </p>
        </div>

        {/* 季節の花装飾 */}
        <div className="flex justify-center gap-3 mb-6">
          {["🌸", "梅", "菊", "藤", "椿", "牡丹", "蓮"].map((flower, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
                border: "1px solid #d14836",
                boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
                animation: "float 2s ease-in-out infinite",
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <span
                className="text-sm"
                style={{ color: "#d14836" }}
              >
                {flower}
              </span>
            </div>
          ))}
        </div>

        <TodoList />

        {/* 下部装飾 */}
        <div className="text-center mt-8 opacity-50">
          <p
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            一期一会
          </p>
        </div>
      </main>
    </div>
  );
}
