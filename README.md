# Meu Gerenciador de Tarefas

Projeto acadêmico em React, TypeScript e Vite. As tarefas ficam no LocalStorage do navegador.

## Executar no VS Code

Extraia o ZIP e abra a pasta `gerenciador-tarefas` no VS Code. Abra o terminal integrado e execute:

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo terminal. Use `npm run build` para verificar a tipagem e gerar a pasta `dist`.

## Conferir as funcionalidades

1. Cadastre duas tarefas e tente cadastrar uma descrição vazia.
2. Edite a primeira tarefa e marque a segunda como concluída.
3. Confira os filtros Todas, Pendentes e Concluídas e os três contadores.
4. Recarregue a página e verifique se a edição e a conclusão foram preservadas.
5. Desmarque a tarefa concluída e exclua uma tarefa após confirmar.

## Publicar na Vercel

1. Envie os arquivos da pasta do projeto para um repositório no GitHub. O arquivo `package.json` deve ficar na raiz.
2. Na Vercel, selecione **Add New → Project** e importe o repositório.
3. Confira o preset **Vite**, o comando `npm run build` e a pasta de saída `dist`.
4. Clique em **Deploy**. Abra a URL de produção em uma janela anônima para conferir o acesso antes de entregar.

## Como funciona

- `App.tsx` guarda as tarefas em `useState`, aplica os filtros e usa `useEffect` para salvar as mudanças no LocalStorage.
- `TaskForm.tsx` recebe a descrição e chama a função de cadastro.
- `TaskList.tsx` usa `map()` para renderizar cada `TaskItem.tsx`.
- `TaskItem.tsx` exibe a tarefa e os controles para concluir, editar e excluir.
