"use client";

interface Button {
  onClick: () => void;
}

function Button({ onClick }: Button) {
  return <button onClick={() => onClick}>Import Project</button>;
}

export default Button;
