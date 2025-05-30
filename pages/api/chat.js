export default async function handler(req, res) {
  const { messages } = req.body;

  const rawRes = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer D0Q9iByPzRkzbMgQUjfR40lYG02FY0R8", // GRATIS tanpa filter
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
