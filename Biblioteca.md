## 💼 **Projeto de Banco de Dados: Livraria**

### 🎯 Enunciado Geral:

Você foi contratado por uma livraria para desenvolver um banco de dados relacional que organize as informações dos clientes, dos livros disponíveis, dos pedidos realizados e dos itens contidos em cada pedido.

Sua missão é **criar as tabelas necessárias**, **definir os campos e os relacionamentos entre elas**, e depois **realizar consultas SQL para extrair informações úteis**.

---

## 📐 **1. Tabela `clientes`**

### 🎯 Objetivo:

Armazenar dados dos clientes cadastrados na livraria.

### 🧱 Estrutura da tabela:

| Campo           | Tipo         | Descrição                      |
| --------------- | ------------ | ------------------------------ |
| `id`            | INT (PK, AI) | Identificador único do cliente |
| `nome`          | VARCHAR(100) | Nome completo do cliente       |
| `email`         | VARCHAR(100) | E-mail do cliente              |
| `data_cadastro` | DATE         | Data do cadastro               |

---

## 📘 **2. Tabela `livros`**

### 🎯 Objetivo:

Armazenar informações sobre os livros disponíveis para venda.

### 🧱 Estrutura da tabela:

| Campo     | Tipo         | Descrição              |
| --------- | ------------ | ---------------------- |
| `id`      | INT (PK, AI) | Identificador do livro |
| `titulo`  | VARCHAR(150) | Título do livro        |
| `autor`   | VARCHAR(100) | Nome do autor          |
| `preco`   | DECIMAL(8,2) | Preço do livro         |
| `estoque` | INT          | Quantidade disponível  |

---

## 📦 **3. Tabela `pedidos`**

### 🎯 Objetivo:

Registrar os pedidos realizados pelos clientes.

### 🧱 Estrutura da tabela:

| Campo        | Tipo         | Descrição                      |
| ------------ | ------------ | ------------------------------ |
| `id`         | INT (PK, AI) | Identificador do pedido        |
| `cliente_id` | INT (FK)     | ID do cliente que fez o pedido |
| `data`       | DATE         | Data do pedido                 |

🔗 **Relacionamento**:

* `cliente_id` referencia `clientes.id`

---

## 📋 **4. Tabela `itens_pedido`**

### 🎯 Objetivo:

Armazenar quais livros foram comprados em cada pedido, com quantidade.

### 🧱 Estrutura da tabela:

| Campo        | Tipo         | Descrição                       |
| ------------ | ------------ | ------------------------------- |
| `id`         | INT (PK, AI) | Identificador do item do pedido |
| `pedido_id`  | INT (FK)     | ID do pedido                    |
| `livro_id`   | INT (FK)     | ID do livro comprado            |
| `quantidade` | INT          | Quantidade do livro comprado    |

🔗 **Relacionamentos**:

* `pedido_id` referencia `pedidos.id`
* `livro_id` referencia `livros.id`

---

## 🔍 **Consultas que os alunos deverão fazer**

1. **Listar todos os clientes cadastrados.**
2. **Listar todos os livros disponíveis com preço e estoque.**
3. **Ver todos os pedidos realizados, com data e nome do cliente.**
4. **Listar todos os livros comprados em um determinado pedido.**
5. **Mostrar o total de livros vendidos por título.**
6. **Mostrar os pedidos feitos por um cliente específico (ex: João Silva).**
7. **Calcular o valor total de cada pedido.**
8. **Listar os clientes que mais compraram livros.**
9. **Listar os livros com menos de 5 unidades em estoque.**
10. **Mostrar o número de pedidos realizados por mês.**
