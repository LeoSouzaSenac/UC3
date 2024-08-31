# Triggers em Banco de Dados

## O que é uma Trigger?

Uma **trigger** é uma ação automática que é executada em resposta a determinados eventos em uma tabela ou visão em um banco de dados. As triggers são comumente usadas para manter a integridade dos dados, realizar cálculos automáticos, ou mesmo para auditar e registrar mudanças em uma tabela.

### Eventos que Disparam Triggers

As triggers podem ser configuradas para serem acionadas por diferentes tipos de eventos, como:

- **INSERT**: Acionada quando uma nova linha é inserida na tabela.
- **UPDATE**: Acionada quando uma linha existente é modificada.
- **DELETE**: Acionada quando uma linha é excluída da tabela.

Além disso, triggers podem ser definidas para serem executadas **antes** (`BEFORE`) ou **depois** (`AFTER`) do evento que as aciona.

### Exemplos Práticos com Tabelas

## Exemplo Prático: RPG

Neste exemplo, vamos criar um sistema básico de RPG onde, ao avançar de nível, os atributos de um jogador (como força e agilidade) são automaticamente incrementados.

### Passo 1: Criação das Tabelas

Primeiro, criamos a tabela `Jogadores`, que armazenará informações sobre cada jogador, e a tabela `Níveis`, que define os atributos ganhos a cada nível.

```sql
-- Tabela Niveis
CREATE TABLE Niveis (
    nivel INT PRIMARY KEY,
    descricao VARCHAR(50),
    bonus_forca INT,
    bonus_agilidade INT
);

-- Tabela Jogadores
CREATE TABLE Jogadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    nivel INT,
    FOREIGN KEY (nivel) REFERENCES Niveis(nivel)
);

-- Tabela Atributos_Jogadores
CREATE TABLE Atributos_Jogadores (
    jogador_id INT PRIMARY KEY,
    forca INT,
    agilidade INT,
    FOREIGN KEY (jogador_id) REFERENCES Jogadores(id)
);

```

### Agora, inserimos alguns níveis e também jogadores.

```sql
-- Inserir dados na tabela Niveis
INSERT INTO Niveis (nivel, descricao, bonus_forca, bonus_agilidade) VALUES
(1, 'Iniciante', 1, 1),
(2, 'Veterano', 2, 2),
(3, 'Guerreiro', 3, 3),
(4, 'Mestre', 4, 4);

-- Inserir dados na tabela Jogadores
INSERT INTO Jogadores (nome, nivel) VALUES
('Arthur', 1),
('Lancelot', 1);

-- Inserir dados na tabela Atributos_Jogadores
INSERT INTO Atributos_Jogadores (jogador_id, forca, agilidade) VALUES
(1, 10, 10),
(2, 12, 8);

```

#### 1. Trigger para Atualizar o Atributo quando sobre de nível

Vamos criar uma trigger que atualiza automaticamente os atributos do jogador quando ele sobe de nível.

### Trigger `Atualizar_Atributos`

```sql
DELIMITER //

CREATE TRIGGER Atualizar_Atributos
AFTER UPDATE ON Jogadores
FOR EACH ROW
BEGIN
    IF NEW.nivel > OLD.nivel THEN
        UPDATE Atributos_Jogadores
        JOIN Niveis ON NEW.nivel = Niveis.nivel
        SET Atributos_Jogadores.forca = Atributos_Jogadores.forca + Niveis.bonus_forca,
            Atributos_Jogadores.agilidade = Atributos_Jogadores.agilidade + Niveis.bonus_agilidade
        WHERE Atributos_Jogadores.jogador_id = NEW.id;
    END IF;
END//

DELIMITER ;
```

### Agora, faça um update na tabela Jogadores, para disparar o trigger:

```sql

UPDATE Jogadores
SET nivel = 2
WHERE id = 1;


```


### Explicação Detalhada

1. **DELIMITER //**
   - Altera o delimitador de comandos SQL de padrão (`;`) para `//`. Isso é necessário para definir blocos de código de triggers e stored procedures que contêm múltiplos comandos SQL.
   
2. **CREATE TRIGGER Atualizar_Atributos**
   - Inicia a criação de uma nova trigger chamada `Atualizar_Atributos`.

3. **AFTER UPDATE ON Jogadores**
   - Especifica que a trigger será executada após (AFTER) a operação de UPDATE na tabela `Jogadores`.
   - Isso significa que o código da trigger será acionado apenas depois que uma linha na tabela `Jogadores` for atualizada.

4. **FOR EACH ROW**
   - Define que a trigger deve ser aplicada a cada linha afetada pela operação de UPDATE.
   - Se a operação de UPDATE afeta várias linhas, a trigger será executada para cada linha individualmente.

5. **BEGIN**
   - Inicia o bloco de código da trigger. Tudo o que está entre `BEGIN` e `END` será executado quando a trigger for acionada.

6. **IF NEW.nivel > OLD.nivel THEN**
   - Verifica se o nível (`nivel`) na nova versão da linha (`NEW.nivel`) é maior do que o nível na versão antiga da linha (`OLD.nivel`).
   - A condição `NEW.nivel > OLD.nivel` garante que o código dentro do bloco `IF` só será executado se o nível do jogador tiver aumentado.

7. **UPDATE Atributos_Jogadores**
   - Atualiza a tabela `Atributos_Jogadores`, que contém os atributos (`forca` e `agilidade`) dos jogadores.
   
8. **JOIN Niveis ON Jogadores.nivel = Niveis.nivel**
   - Faz um JOIN entre a tabela `Atributos_Jogadores` e a tabela `Niveis`.
   - **Explicação**: O JOIN é utilizado para obter os valores de bônus (`bonus_forca` e `bonus_agilidade`) correspondentes ao novo nível do jogador (`NEW.nivel`).

9. **SET Atributos_Jogadores.forca = Atributos_Jogadores.forca + Niveis.bonus_forca,
            Atributos_Jogadores.agilidade = Atributos_Jogadores.agilidade + Niveis.bonus_agilidade**
   - **Objetivo**: Atualiza os atributos `forca` e `agilidade` na tabela `Atributos_Jogadores`.
   - **Explicação**: Os atributos são incrementados pelos bônus associados ao novo nível (`Niveis.bonus_forca` e `Niveis.bonus_agilidade`).

10. **WHERE Atributos_Jogadores.jogador_id = NEW.id;**
    - **Objetivo**: Garante que a atualização seja aplicada somente ao jogador que teve o nível alterado.
    - **Explicação**: `NEW.id` refere-se ao ID do jogador na linha que foi atualizada, garantindo que apenas o jogador específico seja afetado pela atualização dos atributos.

11. **END IF**
    - **Objetivo**: Finaliza o bloco `IF`. O código dentro desse bloco só será executado se a condição `NEW.nivel > OLD.nivel` for verdadeira.

12. **END**
    - **Objetivo**: Finaliza o bloco de código da trigger. Após este ponto, a execução da trigger termina.

13. **DELIMITER ;**
    - **Objetivo**: Restaura o delimitador padrão (`;`). Após a definição da trigger, o delimitador é revertido para o padrão para comandos SQL subsequentes.

### Resumo

A trigger `Atualizar_Atributos` é projetada para atualizar automaticamente os atributos de um jogador na tabela `Atributos_Jogadores` sempre que o nível do jogador na tabela `Jogadores` é aumentado. Ela faz isso verificando se o nível foi elevado e, em caso afirmativo, ajusta os valores dos atributos com base nos bônus associados ao novo nível.

#### 2. Trigger para Registrar Mudanças de Departamento

Vamos criar uma trigger para registrar em uma tabela de auditoria (`auditoria_departamento`) toda vez que um empregado mudar de departamento. Primeiro, precisamos criar esta tabela (use seu banco de dados empresa_seunome). A tabela auditoria_departamento serve para registrar e monitorar as mudanças de departamento dos empregados em uma empresa. Ela é útil para diversos propósitos relacionados à auditoria, controle e análise dos movimentos dentro da organização. É comum usar triggers para isso.

```sql
CREATE TABLE auditoria_departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empregados_id INT,
    antigo_departamento INT,
    novo_departamento INT,
    data_mudanca DATETIME,
    FOREIGN KEY (empregados_id) REFERENCES empregados(id),
    FOREIGN KEY (antigo_departamento) REFERENCES departamentos(id),
    FOREIGN KEY (novo_departamento) REFERENCES departamentos(id)
);

```
Agora, vamos criar a trigger:
```sql

DELIMITER //

CREATE TRIGGER RegistrarMudancaDepartamento
AFTER UPDATE ON empregados
FOR EACH ROW
BEGIN
    IF OLD.departamento_id != NEW.departamento_id THEN
        INSERT INTO auditoria_departamento (empregados_id, antigo_departamento, novo_departamento, data_mudanca)
        VALUES (NEW.empregados_id, OLD.departamento_id, NEW.departamento_id, NOW());
    END IF;
END;

DELIMITER ;

```

**Explicação:**

- **`AFTER UPDATE`**: A trigger será acionada após a atualização de uma linha na tabela `empregados`.
- **`IF OLD.departamento_id != NEW.departamento_id`**: Verifica se o departamento foi alterado.
- **`INSERT INTO auditoria_departamento`**: Insere os detalhes da mudança na tabela de auditoria `auditoria_departamento`.

### Exercícios Práticos

1. **Criar uma Trigger para Calcular o Salário Anual**:
   Crie uma trigger que, ao inserir ou atualizar o salário de um empregado, calcule automaticamente o salário anual e o armazene em uma nova coluna `salario_anual` na tabela `empregados`.

2. **Auditoria de Exclusões de Empregados**:
   Crie uma trigger que registre todas as exclusões de empregados na tabela `auditoria_exclusao_empregados`, armazenando o `empregados_id`, `nome`, `departamento_id`, `titulo`, e a `data_exclusao`.

3. **Trigger para Prevenir Exclusão de Gerentes**:
   Crie uma trigger que impeça a exclusão de empregados cujo título seja 'Gerente', exibindo uma mensagem de erro.

4. **Atualizar Nome do Departamento**:
   Crie uma trigger que, ao alterar o nome de um departamento na tabela `departamentos`, atualize o nome correspondente na tabela `empregados`.

5. **Registro de Aumentos Salariais**:
   Crie uma trigger que registre todos os aumentos salariais em uma tabela `historico_aumentos`, incluindo os campos `empregados_id`, `salario_antigo`, `salario_novo`, e `data_aumento`.

### Considerações Importantes

- **Performance**: Triggers podem impactar o desempenho do banco de dados, especialmente se forem complexas ou se afetarem um grande número de linhas.
- **Debugging**: Como as triggers são executadas automaticamente, pode ser difícil rastrear erros ou comportamentos inesperados.
- **Complexidade**: É importante evitar a criação de triggers muito complexas ou com lógica de negócios pesada, pois isso pode dificultar a manutenção e o entendimento do banco de dados.

### Conclusão

Triggers são ferramentas poderosas que permitem automatizar tarefas e garantir a integridade dos dados no banco de dados. No entanto, devem ser usadas com cuidado para evitar problemas de desempenho e complexidade excessiva.

---

**Referências:**
- [Documentação Oficial do MySQL](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
- [SQL Server Triggers](https://docs.microsoft.com/en-us/sql/relational-databases/triggers/triggers-database-engine)
