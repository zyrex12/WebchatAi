export default async function handler(req, res) {
  const { messages } = req.body;

  const rawRes = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 1fa23284-1c90-4f71-9b55-82e30879ea35", // GRATIS tanpa filter
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages,
      temperature: 0.7
    })
  });

  const data = await rawRes.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
