import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.argv[2] || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.log("Nenhuma chave informada. Uso: node check_models.js <SUA_CHAVE_API> ou defina VITE_GEMINI_API_KEY no arquivo .env");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      console.log("✅ Chave válida! Modelos suportados que possuem 'generateContent':");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("❌ Erro na resposta:", data);
    }
  })
  .catch(err => console.error("Falha ao buscar modelos:", err));
