// Backend do site — Netlify Functions + Netlify Blobs (sem Supabase)
// Leitura: GET  /.netlify/functions/capitulos?livro=levitico&cap=3
// Lista:   GET  /.netlify/functions/capitulos?livro=levitico
// Escrita: POST { chave, livro, capitulo, conteudo }
//          A chave é conferida com a variável de ambiente CHAVE_EDICAO,
//          definida no painel da Netlify — nunca aparece no código do site.
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("biblia");
  const url = new URL(req.url);

  if (req.method === "GET") {
    const livro = url.searchParams.get("livro");
    const cap = url.searchParams.get("cap");
    if (livro && cap) {
      const conteudo = await store.get(`${livro}/${cap}`, { type: "json" });
      return Response.json({ conteudo: conteudo ?? null });
    }
    if (livro) {
      const { blobs } = await store.list({ prefix: livro + "/" });
      const capitulos = blobs.map(b => parseInt(b.key.split("/")[1], 10)).filter(n => !isNaN(n));
      return Response.json({ capitulos });
    }
    return new Response("Parâmetros ausentes", { status: 400 });
  }

  if (req.method === "POST") {
    let dados;
    try { dados = await req.json(); } catch { return new Response("JSON inválido", { status: 400 }); }
    const { chave, livro, capitulo, conteudo } = dados;
    if (!process.env.CHAVE_EDICAO || chave !== process.env.CHAVE_EDICAO)
      return new Response("Chave de edição inválida", { status: 403 });
    if (!livro || !capitulo || !Array.isArray(conteudo))
      return new Response("Dados inválidos", { status: 400 });
    await store.setJSON(`${livro}/${capitulo}`, conteudo);
    return Response.json({ ok: true });
  }

  return new Response("Método não permitido", { status: 405 });
};
