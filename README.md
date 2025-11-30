# API In-Memory - Loja (Node + Express)

Projeto final: API RESTful em memória para gerenciar categorias, produtos, usuários e carrinhos.

## Requisitos
- Node.js (16+)
- npm

## Instalação
```bash
npm install
```

## Rodar
```bash
npm start
# ou, para dev
npm run dev
```

## Variáveis de ambiente (opcional)
- `JWT_SECRET` — segredo para assinar tokens (padrão: `CHANGE_THIS_SECRET`)

## Endpoints principais
- `POST /api/auth/register` — registrar usuário
- `POST /api/auth/login` — login (retorna token JWT)
- `GET /api/categories` — listar categorias
- `POST /api/categories` — criar categoria (autenticado)
- `GET /api/products` — listar produtos
- `POST /api/products` — criar produto (autenticado)
- `POST /api/carts` — criar carrinho
- `POST /api/carts/:id/items` — adicionar item ao carrinho (checa estoque)
- `POST /api/carts/:id/confirm` — confirmar pedido (autenticado) — baixa estoque

## Testes com Insomnia
- Importe o arquivo `insomnia_collection.json` (contido neste zip) para testar rapidamente todos os endpoints.
- Fluxo sugerido: register -> login -> criar categoria -> criar produto -> criar carrinho -> adicionar item -> confirmar carrinho.

## Observações
- Dados são **em memória** (arquivo `src/models/db.js`) e serão perdidos ao reiniciar o servidor.
- Múltiplas camadas: routes → controllers → services → models.
