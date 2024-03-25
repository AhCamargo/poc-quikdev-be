# POC-QUIKDEV-BE!

Nesse Projeto estamos utilizando o Node, Na versão do **NodeJS: 20.11.0**,

Junto com o ORM **PRISMA** para gerenciar o Banco de Dados **PostgreSQL**.

# Pacotes utilizados

> express cors dotenv multer prisma express-async-errors
> @prisma/client pg bcrypt jsonwebtoken resend swagger-jsdoc swagger-ui-express swagger-autogen

## Para rodar esse projeto, precisa ter o _Node_ e _Docker_ instalado em sua máquina:

Agora vamos criar a imagem do banco de dados local com o Docker:

> > docker run --name poc-quikdev -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=quikdev-db -p 5432:5432 -d postgres

Depois é só rodar o npm run dev, caso dê certo terá que aparecer essa mensagem no terminal: **"Server is running on port: 3123"**

> **Atenção:** Não esqueça de criar/preencher seu arquivo _.env_ e copia o modelo de variaveis de ambiente que temos no _.example.env_
