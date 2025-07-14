# 🎲 Great Banco de Dados Championship

## 👥 Organização da Turma

* Vocês serão divididos em **4 grupos de 5 pessoas**.
* Cada grupo irá participar de um **campeonato com 5 jogos**:

  * Xadrez
  * Damas
  * Uno
  * Pife
  * Ping Pong

Cada grupo indicará **um jogador por jogo**. Todos os jogos devem acontecer durante a aula.

---

## 🧩 Objetivo da Atividade

Ao final da aula, cada grupo deve:

1. Criar um banco de dados com todas as informações do campeonato.
2. Montar as **tabelas necessárias** para organizar os dados (jogadores, jogos, grupos, partidas, pontuações...).
3. Registrar os resultados de **todas as partidas jogadas**.
4. Realizar **consultas SQL** para analisar e apresentar os dados.

---

## 📁 Tabelas que devem ser criadas

Seu banco de dados precisa conter:

* Uma tabela com os **grupos participantes**
* Uma tabela com os **jogadores** e o grupo ao qual pertencem
* Uma tabela com os **jogos disponíveis**
* Uma tabela com os **resultados das partidas**, contendo:

  * Qual jogador jogou
  * Qual jogo foi disputado
  * A pontuação obtida
  * A data da partida

---

## 🔍 Consultas obrigatórias

Após inserir os dados no banco, você deverá criar **consultas** que respondam às perguntas abaixo:

### 🧍‍♂️ 1. **Quais são os jogadores e a qual grupo cada um pertence?**

➡️ Verifique a tabela de **jogadores** e veja **a que grupo cada um está associado**.
Para isso, será necessário cruzar a **informação do jogador com o nome do grupo**, que está em outra tabela.

---

### 🎲 2. **Quais foram as partidas jogadas, com jogador, jogo e pontuação?**

➡️ Liste todas as **partidas** que já aconteceram.
Para cada partida, mostre:

* O **nome do jogador**
* O **nome do jogo**
* A **pontuação** obtida

Você precisará buscar as **informações da tabela de partidas** e juntar com os **dados do jogador e do jogo**.

---

### ➕ 3. **Qual é a soma total de pontos de cada grupo?**

➡️ Para **cada grupo**, você deve:

* Pegar todos os **jogadores** que pertencem a ele
* Somar os **pontos que esses jogadores fizeram** nas partidas

Isso exige cruzar os dados das **partidas**, dos **jogadores** e dos **grupos**.

---

### 🥇 4. **Qual jogador teve a maior pontuação em cada jogo?**

➡️ Para **cada jogo (ex: Xadrez, Uno...)**, descubra:

* **Qual foi a maior pontuação registrada**
* **Qual jogador** conseguiu essa pontuação

Você vai olhar a tabela de **partidas**, e relacionar com o **nome do jogador** e o **nome do jogo**.

---

### 📊 5. **Qual é a média de pontuação de cada grupo?**

➡️ Para **cada grupo**:

* Pegue a **pontuação de todas as partidas** feitas pelos jogadores daquele grupo
* Calcule a **média desses pontos**

Será necessário identificar **quais jogadores fazem parte de qual grupo**, e depois **buscar os pontos das partidas**.

---

### 📉 6. **Qual foi a menor e a maior pontuação de cada grupo?**

➡️ Para **cada grupo**:

* Veja **qual foi o menor ponto feito em qualquer partida**
* E também **qual foi o maior ponto registrado**

Você precisa cruzar os dados dos jogadores com seus grupos e verificar suas **pontuações nas partidas**.







