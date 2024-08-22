# Exercícios de Revisão de Banco de Dados

## Instruções
Crie um banco de dados do zero e execute os seguintes exercícios. Cada item deve ser realizado em seu banco de dados recém-criado.
## 1. Criação do Banco de Dados
1. Crie um banco de dados chamado `revisao_` + seu nome.

## 2. Criação de Tabelas
2. Crie uma tabela chamada `clientes` com as colunas: `id` (inteiro, chave primária, auto-incremento), `nome` (texto), `email` (texto), `telefone` (texto), `data_cadastro` (data).
3. Crie uma tabela chamada `produtos` com as colunas: `id` (inteiro, chave primária, auto-incremento), `nome` (texto), `descricao` (texto), `preco` (decimal), `estoque` (inteiro).
4. Crie uma tabela chamada `pedidos` com as colunas: `id` (inteiro, chave primária, auto-incremento), `id_cliente` (inteiro, chave estrangeira), `data_pedido` (data), `status` (texto).
5. Crie uma tabela chamada `itens_pedido` com as colunas: `id` (inteiro, chave primária, auto-incremento), `id_pedido` (inteiro, chave estrangeira), `id_produto` (inteiro, chave estrangeira), `quantidade` (inteiro), `preco_unitario` (decimal).

## 3. Inserção de Dados
6. Insira pelo menos 5 registros na tabela `clientes`.
7. Insira pelo menos 5 registros na tabela `produtos`.
8. Insira pelo menos 4 registros na tabela `pedidos` com clientes diferentes.
9. Insira pelo menos 4 registros na tabela `itens_pedido` associando pedidos e produtos.

## 4. Consultas Simples
10. Selecione todos os registros da tabela `clientes`.
11. Selecione todos os registros da tabela `produtos`.
12. Selecione todos os registros da tabela `pedidos` e associe-os com o nome do cliente.
13. Selecione todos os registros da tabela `itens_pedido` e associe-os com os detalhes do pedido e do produto.

## 5. Consultas Avançadas
14. Encontre todos os pedidos feitos por um cliente específico.
15. Calcule o total de vendas de cada produto (soma dos preços multiplicados pela quantidade em `itens_pedido`).
16. Liste os produtos com estoque abaixo de um valor específico.
17. Encontre os clientes que realizaram pedidos no último mês.
18. Liste o número total de pedidos realizados por cada cliente.

## 6. Atualização de Dados
19. Atualize o preço de um produto na tabela `produtos`.
20. Atualize o status de um pedido para "Concluído" na tabela `pedidos`.
21. Atualize o telefone de um cliente na tabela `clientes`.

## 7. Exclusão de Dados
22. Exclua um cliente da tabela `clientes`.
23. Exclua um produto da tabela `produtos`.
24. Exclua todos os itens de um pedido específico da tabela `itens_pedido`.

## 8. Procedures
25. Crie uma procedure chamada `adicionar_cliente` que insira um novo cliente na tabela `clientes` com os parâmetros `nome`, `email`, e `telefone`.
26. Crie uma procedure chamada `atualizar_preco_produto` que atualize o preço de um produto na tabela `produtos` com os parâmetros `id_produto` e `novo_preco`.
27. Crie uma procedure chamada `registrar_pedido` que insira um novo pedido na tabela `pedidos` com os parâmetros `id_cliente`, `data_pedido`, e `status`.
28. Crie uma procedure chamada `adicionar_item_pedido` que adicione um item à tabela `itens_pedido` com os parâmetros `id_pedido`, `id_produto`, `quantidade`, e `preco_unitario`.

## 9. Functions
29. Crie uma function chamada `calcular_total_pedido` que receba o `id_pedido` e retorne o total do pedido, calculando a soma dos preços multiplicados pela quantidade em `itens_pedido`.
30. Crie uma function chamada `obter_estoque_produto` que receba o `id_produto` e retorne a quantidade em estoque.
31. Crie uma function chamada `verificar_cliente_existente` que receba um `email` e retorne um valor booleano indicando se o cliente existe.
32. Crie uma function chamada `total_vendas_por_cliente` que receba o `id_cliente` e retorne o total de vendas realizadas por esse cliente.

