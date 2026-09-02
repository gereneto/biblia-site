# Sagrada Escritura — site estático

Site de leitura, sem servidor e sem banco de dados. O texto vive nos
próprios arquivos do repositório; para corrigir alguma coisa, edita-se o
arquivo e publica-se pelo Git.

## Estrutura
- `index.html` — o site inteiro (estilo, roteamento e leitura)
- `dados-livros.js` — registro dos livros e índice da harmonia dos Evangelhos
- `livros/<livro>.js` — o texto de cada livro
- `netlify.toml` — só indica que a pasta publicada é a raiz

## Formato do texto

Cada capítulo é um vetor de objetos:

```js
window.TEXTOS_SEED["levitico"][1] = [
  {s:"O Senhor chama Moisés"},                    // subtítulo do trecho
  {v:1, t:"O Senhor chamou Moisés…", n:"nota"},   // versículo em prosa
  {v:2, t:"Fala aos filhos de Israel…", np:1},    // np:1 abre parágrafo
];
```

- `{s:"…"}` abre um trecho temático.
- `{v,t,n}` é um versículo em prosa; `n` é a nota, e faz aparecer † junto
  ao número. Sem `np`, o versículo continua no parágrafo anterior.
- `{v,l:["…","…"],n}` é um versículo em verso: cada item de `l` é um
  verso, e o segundo em diante sai recuado.
- `{p:"Passagem"}` abre uma perícope — usado só na harmonia dos Evangelhos.

Capítulos sem `s`, `np` nem `l` são desenhados no formato antigo, um
versículo por parágrafo. É o caso da harmonia dos Evangelhos, que já vem
dividida por tópicos.

A divisão em trechos, parágrafos e versos segue a Nova Vulgata, que é
também a versificação adotada.

## Como publicar

Qualquer hospedagem de arquivos estáticos serve, porque não há backend.

**GitHub Pages** — em Settings → Pages, escolha a branch `main` e a pasta
raiz. O roteamento é por hash, então funciona também em subdiretório
(`usuario.github.io/biblia-site/`).

**Netlify** — Add new site → Import from Git. Não há comando de build;
o `netlify.toml` já diz que a pasta publicada é a raiz.

## Referências
- Divisão de capítulos e versículos: Nova Vulgata (vatican.va).
- Texto traduzido dos originais, segundo o método «fiel:».
