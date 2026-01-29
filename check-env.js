const u = process.env.DATABASE_URL || "";
console.log("START", u.slice(0,12));
console.log("HAS_POOLER", u.includes("-pooler"));
console.log("HAS_DIRECT", !!process.env.DIRECT_URL);
console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);
