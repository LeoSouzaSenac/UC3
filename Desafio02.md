# Sistema de Gerenciamento de Livros

1. **Criação da Tabela de Livros**:
   - Você precisa organizar de maneira eficiente os dados dos livros disponíveis na biblioteca.
   - Implemente uma tabela chamada `livros` para armazenar essas informações. Cada livro deve ser composto por pelo menos 6 características. Uma das características deve ser o valor unitário (preço).

2. **Criação de Registros de Livros**:
   - Crie pelo menos 10 registros na tabela `livros` com todas as características definidas na etapa anterior.
   - **Tente não usar o Chat GPT por favor :)**

3. **Criação da Tabela de Autores**:
   - Você possui uma lista grande de autores cujos livros estão na biblioteca. Implemente uma tabela chamada `autores` para armazenar os principais dados dos autores. É necessário armazenar pelo menos 5 informações relevantes de cada autor.

4. **Criação de Registros de Autores**:
   - Crie pelo menos 5 registros na tabela `autores` com todas as características definidas na etapa anterior.

5. **Criação da Tabela de Empréstimos**:
   - Agora, você precisa controlar os empréstimos dos livros. Para isso, implemente uma tabela chamada `emprestimos` que indique qual livro está sendo emprestado a qual cliente, além da quantidade de itens, data de empréstimo e o tipo de empréstimo (curto prazo ou longo prazo). A tabela deve garantir a integridade dos dados e evitar duplicação entre as tabelas anteriores.

6. **Criação de Registros de Empréstimos**:
   - Crie 30 registros na tabela `emprestimos` que atendam às seguintes regras:
     - Pelo menos 2 clientes devem ter realizado 6 empréstimos cada.
     - Pelo menos 3 clientes devem ter realizado 4 empréstimos cada.

7. **Relatório de Gastos por Cliente**:
   - Com base no valor unitário (preço) de cada livro e na quantidade de empréstimos, calcule o valor total gasto por cada cliente. Os clientes devem ser ordenados pelo valor total gasto, do menor para o maior.

8. **Relatório de Livros Mais Emprestados**:
   - Apresente um relatório (select) que indique quais livros foram mais emprestados. A ordenação deve levar em consideração a quantidade total de empréstimos, apresentando os livros mais emprestados primeiro.
