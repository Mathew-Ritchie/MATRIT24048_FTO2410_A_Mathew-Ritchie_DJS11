try {
  const res = await fetch("https://podcast-api.netlify.app");
  const data = await res.json();
  console.log(data);
} catch (err) {}

try {
  const res = await fetch("https://podcast-api.netlify.app/genre/2");
  const data = await res.json();
  console.log(data);
} catch (err) {}

try {
  const res = await fetch("https://podcast-api.netlify.app/id/6717");
  const data = await res.json();
  console.log(data);
} catch (err) {}
