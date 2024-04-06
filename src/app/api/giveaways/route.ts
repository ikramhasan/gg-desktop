export async function GET() {
  try {
    const response = await fetch("https://gamerpower.com/api/giveaways");
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.dir(error, { depth: null });
    return new Response("Internal Server Error", { status: 500 });
  }
}
