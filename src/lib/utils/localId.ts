import makeHex from "./makeHex";

export function getLocalId(): string {
  const id = localStorage.getItem("uid");
  if (!id) localStorage.setItem("uid", makeHex(16));
  return localStorage.getItem("uid")!;
}
