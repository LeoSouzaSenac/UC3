CREATE DATABASE IF NOT EXISTS lojaLeo;

USE lojaLeo;

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT PRIMARY KEY,
    descricao VARCHAR(200),
    valor DECIMAL(10, 2),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


-- Inserindo valores na tabela clientes com INSERT IGNORE INTO

INSERT IGNORE INTO clientes (id_cliente, nome, email) VALUES
(1, 'João Silva', 'joao@example.com'),
(2, 'Maria Oliveira', 'maria@example.com'),
(3, 'Pedro Santos', 'pedro@example.com');

-- Inserindo valores na tabela pedidos com INSERT IGNORE INTO

INSERT IGNORE INTO pedidos (id_pedido, descricao, valor, id_cliente) VALUES
(101, 'Compra de móveis', 1500.00, 1),
(102, 'Pedido de eletrônicos', 2500.50, 2),
(103, 'Serviços de instalação', 500.75, 3);




-- Alterar o nome de uma tabela: RENAME TABLE nome_antigo TO nome_novo;

RENAME TABLE clientes TO lojaClientes;

-- Alterar o nome de uma coluna: ALTER TABLE nome_da_tabela CHANGE nome_antigo nome_novo tipo_da_coluna;

ALTER TABLE lojaClientes
CHANGE nome nomes VARCHAR(100);

-- Inserir mais colunas em uma tabela: ALTER TABLE nome_da_tabela ADD COLUMN nome_da_coluna tipo_da_coluna;

ALTER TABLE clientes
ADD COLUMN telefone VARCHAR(15);


-- Inserir valores nas novas colunas criadas: UPDATE nome_da_tabela SET nome_da_coluna = valor WHERE condicao;

UPDATE clientes
SET telefone = 5199999999
WHERE id_cliente = 1;




CREATE TABLE IF NOT EXISTS Produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(100),
    preco_unitario DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS ItensDePedido (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS Pagamentos (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    metodo_pagamento VARCHAR(50),
    valor_pagamento DECIMAL(10, 2),
    data_pagamento DATE,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);
