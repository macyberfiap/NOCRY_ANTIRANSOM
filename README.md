ESTE REPOSITÓRIO CONTÉM NOSSO PROJETO FINAL DO CHALLENGE!!!!
em anti-ransomware monitor temos a parte da interface, e antiransomware o código em si.
slides - https://www.canva.com/design/DAGk8QDocKY/TLLpxQRdDGZ4ugGYtwjwvw/edit?utm_content=DAGk8QDocKY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
relatório - neste repositóro em "Relatório_Challenge"
Grupo: NoCry SEC
Administração, documentação e unificação do projeto:
  Maria Clara Cupertino Da Costa 
  Henrique Buzzutti Sutani
Back-end e desenvolvimento do código:
  Pedro Annunciato Mota 
  Lucas Monaco
  Mateus Leal Mantovani
Interface:
    Mateus Leal Mantovani.

**INSTALAÇÃO E INSTRUÇÕES!!!!: 

NOCRY_ANTIRANSOM — Instruções de Instalação e Execução

Este projeto consiste em uma solução anti-ransomware composta por duas partes:

Interface (frontend): localizada na raiz do projeto, desenvolvida em Node.js/Vite.
Módulo Anti-Ransomware (backend): código principal localizado na pasta Anti-Ransomware, desenvolvido em Python.

Pré-requisitos

Git para clonar o repositório.
Node.js (versão LTS recomendada) e npm ou pnpm.
Python 3.10 ou superior.
Editor de código, recomendado VSCode.

Clonando o Repositório

No terminal, execute:

git clone https://github.com/macyberfiap/NOCRY_ANTIRANSOM.git
cd NOCRY_ANTIRANSOM

Executando a Interface (Frontend)

Instale as dependências:

pnpm install
ou
npm install

Inicie o servidor de desenvolvimento:

pnpm run dev
ou
npm run dev

A interface estará disponível em:

http://localhost:5173

Para gerar a build de produção:

pnpm run build
pnpm run preview

Executando o Backend (Anti-Ransomware)

Navegue até a pasta do backend:

cd Anti-Ransomware

Crie e ative um ambiente virtual Python:

python -m venv venv
.\venv\Scripts\activate   (PowerShell/CMD)

Instale as dependências:

pip install -r requirements.txt

Execute o módulo principal:

python main.py

Se o arquivo principal tiver outro nome (por exemplo app.py), substitua main.py pelo nome correto.

Observações Importantes

Execute o backend em ambiente isolado ou máquina virtual devido ao seu funcionamento sensível com arquivos do sistema.
Verifique o arquivo Relatório_Challenge.docx para informações adicionais sobre o funcionamento interno do projeto.

Resumo de Comandos

git clone https://github.com/macyberfiap/NOCRY_ANTIRANSOM.git
cd NOCRY_ANTIRANSOM

Frontend:
pnpm install
pnpm run dev

Backend:
cd Anti-Ransomware
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py


