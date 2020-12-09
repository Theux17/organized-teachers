<h1 align="center" > API - Professor Organizado </h1>

<p>O projeto foi baseado em uma ideia minha, aonde eu estava pensando em fazer uma api, após ficar horas pensando eu tive a ideia de desenvolver uma api para ajudar os professores a organizar as suas atividades, ao invés de guardar as atividades e acumular diversos papéis, eles podem salvar elas colocando os dados como o nome da atividade, classe, matéria, alunos e etc... Para cadastrar as atividades, o professor precisa fazer um cadastro e depois cadastrar os seus alunos e assim ele pode cadastrar as suas atividades.</p>

---
## Tecnologias utilizadas no projeto

- Node.js
- Express.js
- PostgreSQL

---
## Rotas 

### Login / Logout

ROTA                  |  HTTP(Verbo)      |         Descrição                | 
--------------------  | ----------------- |    ---------------------         | 
/teachers/login       |      POST         |   Realiza login do professor     | 
/teachers/logout      |      POST         |   Realiza o logout do professor  | 

### Forgot / Reset-password

ROTA                 |     HTTP(Verbo)   |      Descrição         |                                      
-------------------- | ----------------- | --------------------- | 
/teachers/forgot-password |       POST          |   Envia um email para o professor recuperar a senha   | 
/teachers/reset-password        |       POST                 |   O profesosr cadastra uma nova senha   | 

### Teachers

ROTA                   |     HTTP(Verbo)   |       Descrição       | 
 --------------------  | ----------------- | --------------------- |
/teachers              |       POST         |  O professor faz o cadastro    | 
/teachers/profile/:id  |   GET        |         O  professor visualiza o seu perfil    |  
/teachers/:id          |       PUT         |  O professor atualiza os seus dados | 
/teachers/:id             |       DELETE      |   O professor exclui a sua conta |

### Students

ROTA                   |     HTTP(Verbo)   |       Descrição       | 
 --------------------  | ----------------- | --------------------- |
/teachers/students     |       GET         |  O professor visualiza os estudantes cadastrados    | 
/teachers/students    | POST        |     O professor cadastra novos alunos  |  
/teachers/students/:id  |       GET    |  O professor visualiza um estudante específico | 
/teachers/students/:id  |  PUT    |  O professor atualiza um estudante específico |
/teachers/students/:id  |  DELETE    |  O professor exclui um estudante específico

### Activities

ROTA                   |     HTTP(Verbo)   |       Descrição       | 
 --------------------  | ----------------- | --------------------- |
/teachers/activities   |       GET         | O professor visualiza todas atividades | 
/teachers/activities    | POST        |     O professor cadastra uma nova atividade  |  
/teachers/activities/:id  |       GET    |  O professor visualiza uma atividade específica | 
/teachers/activities/:id  |  PUT    |  O professor atualiza uma atividade específica |
/teachers/activities/:id  |  DELETE    |  O professor exclui uma atividade específica

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