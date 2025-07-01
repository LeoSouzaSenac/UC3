# O que são Bancos de Dados Relacionais?

## Introdução

Um **banco de dados relacional** é um tipo de sistema para armazenar, organizar e gerenciar dados de forma estruturada, usando tabelas que se relacionam entre si.

---

## Estrutura Básica

- **Tabelas:**  
  Os dados são armazenados em tabelas (ou "relações"). Cada tabela representa uma entidade, como "clientes", "produtos", "pedidos".

- **Linhas e Colunas:**  
  Cada tabela é formada por linhas (também chamadas de registros ou tuplas) e colunas (atributos ou campos).  
  - Cada linha representa uma ocorrência da entidade.  
  - Cada coluna representa uma característica ou informação da entidade.

---

## Relacionamentos

O diferencial dos bancos de dados relacionais está em como as tabelas podem ser conectadas:

- **Chave Primária (Primary Key):**  
  Uma coluna ou conjunto de colunas que identificam unicamente cada registro numa tabela.

- **Chave Estrangeira (Foreign Key):**  
  Uma coluna em uma tabela que referencia a chave primária de outra tabela, criando uma ligação entre elas.

Exemplo:  
Uma tabela `Pedidos` pode ter uma coluna `cliente_id` que referencia o `id` da tabela `Clientes`.

---

## Vantagens dos Bancos Relacionais

- **Organização estruturada:** Os dados ficam organizados em tabelas com formato bem definido.  
- **Integridade dos dados:** Com chaves primárias e estrangeiras, garante-se que os dados estejam consistentes e relacionados corretamente.  
- **Consultas eficientes:** Utilizam a linguagem SQL (Structured Query Language) para buscar e manipular dados.  
- **Flexibilidade:** Permite adicionar, modificar e relacionar dados facilmente.

---

## Exemplos de Bancos de Dados Relacionais

- MySQL  
- PostgreSQL  
- Oracle Database  
- Microsoft SQL Server

---

## Resumo Visual

| Clientes                  | Pedidos                      |
|--------------------------|------------------------------|
| **id (PK)** | nome         | **id (PK)** | cliente_id (FK) | data       |
| 1                        | João                          | 101          | 1               | 2024-06-01 |
| 2                        | Maria                         | 102          | 2               | 2024-06-02 |

No exemplo acima, a coluna `cliente_id` na tabela `Pedidos` referencia o `id` da tabela `Clientes`, relacionando os dados.
