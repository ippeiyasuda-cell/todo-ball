"use client";

import { useState } from "react";
import { useTodos, Todo } from "../hooks/useTodos";

function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const starCount = (index % 7) + 1;

  return (
    <li
      className="flex items-center gap-3 p-4 rounded-lg group transition-all hover:scale-[1.02]"
      style={{
        background: todo.completed
          ? "linear-gradient(135deg, #81c784 0%, #4caf50 100%)"
          : "linear-gradient(135deg, #fff 0%, #fff3e0 100%)",
        border: "4px solid #000",
        boxShadow: "5px 5px 0 #000",
      }}
    >
      {/* ドラゴンボール風チェックボックス */}
      <button
        onClick={() => onToggle(todo.id)}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 flex-shrink-0"
        style={{
          background: todo.completed
            ? "linear-gradient(135deg, #ffd700 0%, #ff9800 100%)"
            : "linear-gradient(135deg, #ffeb3b 0%, #ff9800 50%, #ff6b00 100%)",
          border: "3px solid #000",
          boxShadow: todo.completed ? "0 0 15px #ffd700" : "2px 2px 0 #000",
        }}
      >
        <span className="text-red-700 font-bold text-sm">
          {todo.completed ? "✓" : starCount}
        </span>
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 text-lg rounded"
          style={{
            border: "3px solid #000",
            fontFamily: "'Bangers', sans-serif",
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer text-xl ${
            todo.completed ? "line-through text-gray-700" : "text-gray-900"
          }`}
          style={{
            fontFamily: "'Bangers', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* かめはめ波風削除ボタン */}
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 px-3 py-2 rounded-lg transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)",
          border: "3px solid #000",
          boxShadow: "3px 3px 0 #000",
          color: "#fff",
          fontFamily: "'Bangers', sans-serif",
        }}
      >
        消滅！
      </button>
    </li>
  );
}

export default function TodoList() {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo, editTodo } =
    useTodos();
  const [newTodoText, setNewTodoText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodoText);
    setNewTodoText("");
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "linear-gradient(135deg, #ffeb3b 0%, #ff6b00 100%)",
            border: "4px solid #000",
            animation: "power-up 0.5s ease-in-out infinite",
          }}
        />
        <p
          className="mt-4 text-xl"
          style={{
            color: "#ff6b00",
            textShadow: "2px 2px 0 #000",
          }}
        >
          気を集中中...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="新しい修行を入力..."
            className="flex-1 px-4 py-3 text-xl rounded-lg"
            style={{
              border: "4px solid #000",
              boxShadow: "5px 5px 0 #000",
              fontFamily: "'Bangers', sans-serif",
              letterSpacing: "0.05em",
            }}
          />
          <button
            type="submit"
            disabled={!newTodoText.trim()}
            className="px-6 py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #ff6b00 0%, #e53935 100%)",
              border: "4px solid #000",
              boxShadow: "5px 5px 0 #000",
              color: "#fff",
              fontFamily: "'Bangers', sans-serif",
              fontSize: "1.25rem",
              letterSpacing: "0.1em",
            }}
          >
            追加だ！
          </button>
        </div>
      </form>

      {/* 戦闘力（進捗）表示 */}
      {totalCount > 0 && (
        <div
          className="mb-4 p-3 rounded-lg text-center"
          style={{
            background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
            border: "3px solid #000",
            boxShadow: "4px 4px 0 #000",
          }}
        >
          <span
            className="text-xl text-white"
            style={{
              fontFamily: "'Bangers', sans-serif",
              textShadow: "2px 2px 0 #000",
            }}
          >
            戦闘力: {completedCount} / {totalCount} 達成！
          </span>
          {completedCount === totalCount && totalCount > 0 && (
            <span className="ml-2 animate-pulse">🐉</span>
          )}
        </div>
      )}

      {todos.length === 0 ? (
        <div
          className="text-center py-12 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "4px solid #000",
            boxShadow: "5px 5px 0 #000",
          }}
        >
          <div
            className="text-6xl mb-4"
            style={{
              animation: "power-up 2s ease-in-out infinite",
            }}
          >
            🐉
          </div>
          <p
            className="text-2xl"
            style={{
              color: "#ff6b00",
              textShadow: "2px 2px 0 #000",
              fontFamily: "'Bangers', sans-serif",
            }}
          >
            修行が必要だ！
          </p>
          <p
            className="text-lg mt-2"
            style={{
              fontFamily: "'Bangers', sans-serif",
            }}
          >
            上のフォームからタスクを追加しろ！
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
