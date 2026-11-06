# Thalys Rodrigues · portfólio

Portfólio pessoal de desenvolvedor full stack com foco em backend.

Página estática em HTML, CSS e JavaScript, sem framework e sem etapa de build.

## Conteúdo

- **Sobre**: bio, o que estou fazendo agora e a stack do dia a dia.
- **Projetos selecionados**: Zé Resolve (Flutter + FastAPI), API de monitoramento RFID (Node.js + PostgreSQL), E-Play (Next.js) e Trybe Futebol Clube (TypeScript + Express).
- **Experiência e formação**: residência EmbarcaTech, IFRN e Trybe, com os certificados.
- **Escrita e apresentações**: artigo na Revista FT e a demo narrada do Zé Resolve.

## Rodar localmente

Qualquer servidor de arquivos estáticos funciona. Na raiz do projeto:

```sh
python -m http.server 5180
```

Depois, abra http://localhost:5180.

## Publicar

A raiz do repositório já é o site:

- **GitHub Pages**: Settings → Pages → Deploy from a branch → `main` / `(root)`.
- **Netlify** e **Vercel**: `netlify.toml` e `vercel.json` publicam a raiz, sem comando de build.

## Estrutura

```text
index.html      página
style.css       estilos (cores definidas por função no topo do arquivo)
script.js       animações de entrada, chuva de código no topo e player do vídeo sob demanda
assets/
  projects/     imagens dos projetos
  cv/           currículo em PDF
  certificates/ certificados (cópias de consulta, algumas com dados pessoais ocultos)
```

O vídeo do Zé Resolve só carrega o player do YouTube (`youtube-nocookie.com`) quando a pessoa clica.
