export const SAMPLES: [string, string][] = [
  ["JSON", '{"user":{"id":42,"name":"Ada","roles":["admin","dev"],"active":true,"lastLogin":null}}'],
  [
    "JWT",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJBZGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTgwMDAwMDAsImV4cCI6MTk4MDAwMDAwMH0.svAWTrMP_3owja4Rm7cHu8Rcbk7jFlAFqQeKdcesX9I",
  ],
  ["Cron", "*/15 9-17 * * 1-5"],
  [
    "Stack trace",
    "TypeError: Cannot read properties of undefined (reading 'map')\n    at UserList (/app/src/components/UserList.tsx:14:22)\n    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:16305:18)\n    at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:20074:13)",
  ],
  ["Color", "#ff6b35"],
  ["Timestamp", "1758000000"],
  ["URL", "https://shop.example.com/search?q=running+shoes&size=42&sort=price_asc#results"],
  ["SQL", "select u.id, u.name, count(o.id) as orders from users u left join orders o on o.user_id = u.id group by u.id"],
  ["Code", "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a"],
];
