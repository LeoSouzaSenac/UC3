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
CREATE TABLE Niveis (
    nivel INT PRIMARY KEY,
    descricao VARCHAR(50),
    bonus_forca INT,
    bonus_agilidade INT
);

CREATE TABLE Jogadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    nivel INT,
    forca INT,
    agilidade INT,
    FOREIGN KEY (nivel) REFERENCES Niveis(nivel)
);
```

### Agora, inserimos alguns níveis e também jogadores.

```sql
INSERT INTO Niveis (nivel, descricao, bonus_forca, bonus_agilidade) VALUES
(1, 'Iniciante', 1, 1),
(2, 'Veterano', 2, 2),
(3, 'Guerreiro', 3, 3),
(4, 'Mestre', 4, 4);

INSERT INTO Jogadores (nome, nivel, forca, agilidade) VALUES
('Arthur', 1, 10, 10),
('Lancelot', 1, 12, 8);
```

#### 1. Trigger para Atualizar o Atributo quando sobre de nível

Vamos criar uma trigger que atualiza automaticamente os atributos do jogador quando ele sobe de nível.

```sql
CREATE TRIGGER Atualizar_Atributos
AFTER UPDATE ON Jogadores
FOR EACH ROW
BEGIN
    IF NEW.nivel > OLD.nivel THEN
        UPDATE Jogadores
        SET forca = forca + (SELECT bonus_forca FROM Niveis WHERE nivel = NEW.nivel),
            agilidade = agilidade + (SELECT bonus_agilidade FROM Niveis WHERE nivel = NEW.nivel)
        WHERE id = NEW.id;
    END IF;
END;
```

**Explicação:**

- **CREATE TRIGGER Atualizar_Atributos**: Esta linha inicia a criação de uma trigger chamada Atualizar_Atributos. A trigger será ativada automaticamente quando um evento específico ocorrer na tabela Jogadores.
- **AFTER UPDATE ON Jogadores**: Define que a trigger será executada após (AFTER) uma operação de UPDATE ocorrer na tabela Jogadores. Isso significa que a trigger só será acionada depois que os dados na tabela Jogadores forem atualizados.
- **FOR EACH ROW**: Especifica que a trigger será aplicada a cada linha que for afetada pela operação de UPDATE. Isso é útil em caso de atualizações que afetam várias linhas ao mesmo tempo.
- **BEGIN**: Inicia o bloco de código da trigger. Tudo que está entre BEGIN e END será executado quando a trigger for acionada.
- **IF NEW.nivel > OLD.nivel THEN**: Verifica se o valor do campo nivel na nova versão da linha (NEW.nivel) é maior do que o valor do nivel na versão antiga da linha (OLD.nivel). Em outras palavras, verifica se o jogador subiu de nível. Se a condição for verdadeira, o código dentro do bloco IF será executado.
- **UPDATE Jogadores**: Atualiza a tabela Jogadores.
- **SET forca = forca + (SELECT bonus_forca FROM Niveis WHERE nivel = NEW.nivel), agilidade = agilidade + (SELECT bonus_agilidade FROM Niveis WHERE nivel = NEW.nivel)**: Incrementa os atributos forca e agilidade do jogador, somando os valores de bônus (bonus_forca e bonus_agilidade) que correspondem ao novo nível do jogador (NEW.nivel). Os valores de bônus são obtidos da tabela Niveis.
- **WHERE id = NEW.id**: Garante que a atualização seja feita somente para o jogador que teve o nível atualizado. O NEW.id refere-se ao id do jogador na linha que foi modificada.
- **END IF**: Finaliza o bloco IF. Nenhum código dentro deste bloco será executado se a condição NEW.nivel > OLD.nivel não for atendida (ou seja, se o jogador não subiu de nível).
- **END**: Finaliza o bloco de código da trigger. A partir deste ponto, a execução da trigger termina.

#### 2. Trigger para Registrar Mudanças de Departamento

Vamos criar uma trigger para registrar em uma tabela de auditoria (`auditoria_departamento`) toda vez que um empregado mudar de departamento.

```sql
CREATE TRIGGER RegistrarMudancaDepartamento
AFTER UPDATE ON empregados
FOR EACH ROW
BEGIN
    IF OLD.departamento_id != NEW.departamento_id THEN
        INSERT INTO auditoria_departamento (empregados_id, antigo_departamento, novo_departamento, data_mudanca)
        VALUES (NEW.empregados_id, OLD.departamento_id, NEW.departamento_id, NOW());
    END IF;
END;
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
