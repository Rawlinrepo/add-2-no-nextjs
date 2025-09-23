'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [num1, setNum1] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [result, setResult] = useState<number | null>(null);

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1: Number(num1), num2: Number(num2) }),
    });

    const data = await res.json();
    if (res.ok) setResult(data.sum);
    else alert(data.error);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Add Two Numbers (Server + Client)</h1>
      <form onSubmit={handleAdd}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Enter first number"
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Enter second number"
          required
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add</button>
      </form>
      {result !== null && (
        <h2 style={{ marginTop: '20px' }}>Result: {result}</h2>
      )}
    </div>
  );
}
