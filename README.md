<h1 align="center" > API - Professor Organizado </h1>

<p>O projeto foi baseado em uma ideia minha, aonde eu estava pensando em fazer uma api, após ficar horas pensando eu tive a ideia de desenvolver uma api para ajudar os professores a organizar as suas atividades, ao invés de guardar as atividades e acumular diversos papéis, eles podem salvar elas colocando os dados como o nome da atividade, classe, matéria, alunos e etc... Para cadastrar as atividades, o professor precisa fazer um cadastro e depois cadastrar os seus alunos e assim ele pode cadastrar as suas atividades.</p>

---
## Tecnologias utilizadas no projeto

- Node.js
- Express.js
- PostgreSQL

---
## Para executar o projeto 

<p align="center"><strong> Antes você precisar instalar o 
<a href="https://nodejs.org/en/download">Node.js</a> e o banco de dados <a href="https://www.postgresql.org/download/">PostgreSQL</a>. Após instalar seguir o passo a passo abaixo.</strong></p>

## Banco de dados

* Você vai precisar ligar o banco de dados de acordo com o seu sistema operacional, pode conferir <a href="https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html">aqui</a>.

* Criar uma base de dados com o nome 'organized_teacher' com o comando `CREATE DATABASE organized-teacher`.

* Após criar a base de dados rodar as <strong>querys</strong> que está no arquivo <strong>database.sql</strong>

---
## Aplicação

```bash
# Clonar o repositório
$ git clone https://github.com/Theux17/organized-teachers.git

# Entrar no diretório 
$ cd organized-teachers
```
* Criar um arquivo na raiz chamado `.env` e copiar os dados do `.env.example` e preencher com as informações necessária.

* Criar uma conta no <a href="https://mailtrap.io/">mailtrap</a>, selecionar em <strong>integrations</strong> a opção nodejs, copiar o <strong>user</strong> e o <strong>pass</strong>. Depois é só voltar na aplicação, ir até pasta lib e ir no arquivo `mailer.js` e trocar o user e o pass de acordo com seu.

```bash
# Instalar todas as dependências 
$ yarn install // npm install

# Iniciar o servidor
$ yarn start // npm start
```