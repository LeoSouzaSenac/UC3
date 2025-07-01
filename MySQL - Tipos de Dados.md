# 🗃️ Tipos de Dados no MySQL

Os **tipos de dados** no MySQL definem **que tipo de informação** uma coluna pode armazenar, como números, textos, datas, etc. Usar o tipo certo melhora o desempenho e evita erros no banco.

---

## 🔢 1. Tipos Numéricos

### ➕ Números Inteiros

| Tipo        | Tamanho (bytes) | Valores possíveis (sem sinal)     | Descrição                          |
|-------------|------------------|-----------------------------------|------------------------------------|
| TINYINT     | 1                | 0 a 255                            | Números pequenos                   |
| SMALLINT    | 2                | 0 a 65.535                         | Números pequenos/medianos          |
| MEDIUMINT   | 3                | 0 a 16 milhões                     | Raramente usado                    |
| INT ou INTEGER | 4             | 0 a 4 bilhões                      | Mais comum, ideal para IDs         |
| BIGINT      | 8                | 0 a 18 quintilhões                 | Números extremamente grandes       |

> Use `UNSIGNED` se não precisa de números negativos (dobra o limite positivo).

---

### 🧮 Números Decimais / Reais

| Tipo        | Precisão        | Descrição                                        |
|-------------|------------------|--------------------------------------------------|
| DECIMAL(x,y)| Alta precisão    | Ex: `DECIMAL(5,2)` → até 999.99                 |
| FLOAT       | Precisão simples | Números com casas decimais (menos preciso)      |
| DOUBLE      | Alta precisão    | Números com casas decimais (mais preciso)       |

> `DECIMAL` é ideal para dinheiro. `FLOAT` e `DOUBLE` são melhores para cálculos científicos.

---

## 📝 2. Tipos de Texto (Strings)

| Tipo        | Tamanho máximo            | Descrição                                |
|-------------|---------------------------|------------------------------------------|
| CHAR(n)     | Até 255 caracteres         | Tamanho fixo. Ex: `CHAR(5)` sempre ocupa 5 |
| VARCHAR(n)  | Até 65.535 caracteres¹     | Tamanho variável. Ex: nomes, e-mails     |
| TINYTEXT    | 255 caracteres             | Texto curto                              |
| TEXT        | 65.535 caracteres (64 KB)  | Texto médio (ex: descrições)             |
| MEDIUMTEXT  | 16 milhões de caracteres   | Texto longo                              |
| LONGTEXT    | 4 bilhões de caracteres    | Texto muito grande                       |
| ENUM        | Valores fixos pré-definidos| Ex: `ENUM('M','F')`                      |
| SET         | Lista de valores múltiplos | Ex: `SET('azul','verde','vermelho')`     |

> ¹ Depende do charset (UTF-8 ocupa mais espaço por caractere)

---

## 📆 3. Tipos de Data e Hora

| Tipo        | Exemplo               | Descrição                           |
|-------------|------------------------|-------------------------------------|
| DATE        | `2025-07-01`           | Apenas a data (AAAA-MM-DD)          |
| TIME        | `13:45:30`             | Apenas a hora                       |
| DATETIME    | `2025-07-01 13:45:30`  | Data e hora                         |
| TIMESTAMP   | `2025-07-01 13:45:30`  | Data/hora que atualiza automaticamente |
| YEAR        | `2025`                 | Apenas o ano                        |

> `TIMESTAMP` é ótimo para rastrear quando um dado foi criado ou alterado.

---

## 🔄 4. Tipos Lógicos (Booleanos)

| Tipo     | Descrição                    |
|----------|------------------------------|
| BOOLEAN  | Aceita `TRUE` ou `FALSE`     |
| BOOL     | Sinônimo de `TINYINT(1)`     |

> No MySQL, `BOOLEAN` é tratado como `TINYINT(1)` (0 = FALSO, 1 = VERDADEIRO)

---

Claro! Aqui está a tabela atualizada com **explicações práticas** de uso para cada tipo binário no MySQL:

---

## 📂 5. Tipos Binários (Avançado)

| Tipo           | Descrição técnica                      | Tamanho máximo   | Uso comum/prático                                         |
| -------------- | -------------------------------------- | ---------------- | --------------------------------------------------------- |
| `BINARY(n)`    | Cadeia binária de tamanho **fixo**     | Até 255 bytes    | Senhas criptografadas, hashes fixos, tokens               |
| `VARBINARY(n)` | Cadeia binária de tamanho **variável** | Até 65.535 bytes | Tokens de acesso, arquivos leves, dados criptografados    |
| `TINYBLOB`     | Objeto binário pequeno                 | Até 255 bytes    | Ícones, imagens pequenas, miniaturas                      |
| `BLOB`         | Objeto binário padrão                  | Até 64 KB        | PDFs simples, fotos padrão, arquivos compactos            |
| `MEDIUMBLOB`   | Objeto binário médio                   | Até 16 MB        | Áudios, imagens HD, documentos maiores                    |
| `LONGBLOB`     | Objeto binário grande                  | Até 4 GB         | Vídeos, arquivos ZIP, arquivos grandes de upload/download |

---

## 💡 Exemplo Prático

```sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(8,2),
    disponivel BOOLEAN,
    descricao TEXT,
    criado_em DATETIME
);
````

---

## ✅ Dicas para usar tipos corretamente

* **IDs numéricos:** use `INT` ou `BIGINT` com `AUTO_INCREMENT`
* **Textos comuns:** use `VARCHAR(100)` ou `VARCHAR(255)`
* **Textos grandes:** use `TEXT` ou `MEDIUMTEXT`
* **Dinheiro:** use `DECIMAL(10,2)`
* **Datas:** use `DATE`, `DATETIME` ou `TIMESTAMP` conforme o caso

