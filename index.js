// Importa a biblioteca sqlite3 e cria uma nova instância do banco de dados SQLite, conectando-se ao arquivo exemplo.db.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('exemplo.db');

// Comando SQL para criar a tabela Funcionarios (se ainda não existir)
db.run(
    `
    CREATE TABLE IF NOT EXISTS Funcionarios (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        cargo TEXT,
        salario REAL
    )
`, 
    // O callback (err) em db.run() é usado para capturar e relatar erros caso ocorram durante a execução do comando SQL.
    (err) => {
        if (err) {
            console.error('Erro ao criar a tabela Funcionarios:', err.message);
        } else {
            console.log('Tabela Funcionarios criada com sucesso.');

            // Dados dos funcionários a serem inseridos na tabela
            const funcionarios = [
                { nome: 'João Silva', cargo: 'Desenvolvedor', salario: 4500.00 },
                { nome: 'Maria Oliveira', cargo: 'Analista', salario: 5500.00 },
                { nome: 'Pedro Souza', cargo: 'Gerente', salario: 7500.00 },
                { nome: 'Leo Souza', cargo: 'Professor', salario: 1.00 },
            ];

            // Comando SQL para inserir dados na tabela Funcionarios
            const insertQuery = `
                INSERT INTO Funcionarios (nome, cargo, salario)
                VALUES (?, ?, ?)
            `;

            // Função para inserir cada funcionário
            funcionarios.forEach((funcionario) => {
                db.run(insertQuery, [funcionario.nome, funcionario.cargo, funcionario.salario], function(err) {
                    if (err) {
                        console.error('Erro ao inserir funcionário:', err.message);
                    } else {
                        console.log(`Funcionário inserido com sucesso. ID: ${this.lastID}`);
                    }
                });
            });

            // Fechar conexão com o banco de dados SQLite após a inserção
            db.close((err) => {
                if (err) {
                    return console.error('Erro ao fechar o banco de dados:', err.message);
                }
                console.log('Conexão com o banco de dados SQLite fechada.');
            });
        }
    }
);

 /*
    CREATE TABLE IF NOT EXISTS Funcionarios: Esta parte do comando SQL indica que estamos criando uma nova tabela chamada Funcionarios no banco de dados. O IF NOT EXISTS é uma cláusula opcional que garante que a tabela só será criada se ainda não existir no banco de dados. Isso evita erros caso a tabela já tenha sido criada anteriormente.

    id INTEGER PRIMARY KEY,: Aqui começamos a definir as colunas da tabela Funcionarios.

    id INTEGER PRIMARY KEY: Define a coluna id como do tipo INTEGER (número inteiro) e como a chave primária (PRIMARY KEY) da tabela. A chave primária é única para cada registro na tabela e geralmente é usada para identificar exclusivamente cada linha na tabela.

    nome TEXT NOT NULL,: Define a coluna nome como do tipo TEXT (texto) e especifica que ela não pode ser nula (NOT NULL). Isso significa que cada registro na tabela deve ter um valor não nulo para a coluna nome.

    cargo TEXT,: Define a coluna cargo como do tipo TEXT (texto). Essa coluna permite armazenar informações de texto para o cargo do funcionário.

    salario REAL: Define a coluna salario como do tipo REAL, que é um tipo numérico no SQLite usado para armazenar valores de ponto flutuante (números reais). Isso pode incluir valores decimais para representar o salário do funcionário.
    */
