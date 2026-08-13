const apiKey = "AIzaSyCtLkYhWRsG8lfaS88adVpR5Bxo1oBwECw";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      console.log("Modelos suportados que possuem 'generateContent':");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.log("Erro na resposta:", data);
    }
  })
  .catch(err => console.error("Falha ao buscar modelos:", err));
