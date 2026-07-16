# Sagrada Escritura — versão sem Supabase (tudo na Netlify)

O banco agora é o **Netlify Blobs**, e a escrita passa por uma **Netlify
Function** (`netlify/functions/capitulos.mjs`). Nada de serviço externo:
leitura, edição e hospedagem ficam no mesmo site, dentro do plano
gratuito da Netlify (125 mil chamadas de função/mês — muito acima do
necessário para leitura pessoal).

## Estrutura
- `index.html` — o site (leitura + edição)
- `dados-biblia.js` — Levítico 1–27 embutido (semente)
- `netlify/functions/capitulos.mjs` — lê e grava os capítulos no Blobs
- `netlify.toml`, `package.json` — configuração da Netlify

## Como publicar
A função usa a dependência `@netlify/blobs`, então o deploy precisa ser
por **repositório Git** ou **CLI** (o arrastar-e-soltar não instala
dependências):

**Opção A — GitHub (recomendada)**
1. Suba esta pasta para um repositório no GitHub.
2. Na Netlify: Add new site → Import from Git → escolha o repositório.
   Não precisa de comando de build; o `netlify.toml` já resolve.

**Opção B — CLI**
```
npx netlify login
npx netlify deploy --prod
```

## A chave de edição
1. No painel da Netlify: Site configuration → **Environment variables** →
   adicione `CHAVE_EDICAO` com uma senha longa e secreta.
   (Depois de criar a variável, faça um redeploy.)
2. **Seu link (edição)** — abra UMA vez:
   `https://seu-site.netlify.app/#chave=SUA_CHAVE`
   A chave fica gravada no aparelho; daí em diante use o link normal.
3. **Link dos amigos (só leitura)** — o endereço normal, sem a chave.
   A senha é conferida no servidor, dentro da função; não existe no
   código que o navegador recebe.

## Primeiro uso
No modo edição, na tela inicial, toque em «Enviar textos embutidos para
a nuvem»: isso grava os 27 capítulos no Blobs (sem sobrescrever capítulos
que você já tenha editado). Depois, tudo se edita pelo próprio site:
capítulo → Editar → corrigir → Salvar.

## Notas de tradução
Versículos com nota mostram † junto ao número. Toque no número para abrir
a nota; toque de novo no mesmo número (ou em qualquer lugar) para fechar.

## Referências
- Divisão de capítulos e versículos: Nova Vulgata (vatican.va).
- Texto traduzido dos originais, segundo o método «fiel:».

## Migrando o que já foi editado no Supabase
Se você já tinha edições salvas no Supabase, me avise que eu preparo um
pequeno script para exportar de lá e importar aqui.
