# Computadora
Página web que conversa com você quando você estiver sem amizades.

##Configurações
As configurações podem ser editadas em knowledge-base.json.
 - O atributo "input" é reservado para receber uma expressão regular ou um array de expressões regulares com as quais a sua fala deve combinar para que uma interação ocorra;
 - O atributo "continue" definido como true indica que mesmo depois que ocorrer a combinação com esta interação, o sistema deve continuar buscando mais respostas para a frase recebida;
 - O atributo "single" ainda não está funcionando, mas servirá para garantir que o sistema execute a interação somente uma vez;
 - O atributo "responseChance" recebe um valor decimal entre 0 e 1, e indica um valor percentual de chance daquela resposta ser entregue para aquela frase, se todas as frases combinarem e todas tiverem um valor percentual vinculado, pode acontecer de nenhuma das frases ser executada, o valor percentual é individual de cada resposta e não é acumulado entre as combinações;
 - O atributo "output" contém a resposta que o computador deve entregar, ou então um array de respostas. Uma resposta pode ser uma string ou um objeto contendo o atributo "follow", que recebe um array de interações que só são disponibilizadas depois que esta resposta for executada;

##Intalação
Depois de baixar o conteúdo usando ```git clone https://github.com/lordazzi/computadora```, você deve executar o comando ```npm install``` dentro da pasta do projeto.
Para gerar a build, execute ```npm run build``` dentro da pasta do projeto.
Será gerado um conteúdo dentro da pasta /dist, este conteúdo deve ser jogado dentro de um servidor de páginas, um apache por exemplo.
Certifique-se que você tem o node, git e webpack instalado em seu computador.
Para instalar o webpack utilize ```npm install -g webpack```


#Compatibilidade
Somente com as versões mais atuais do Chrome.

##Contribuindo
Você quer adicionar frases, testes unitários ou corrigir problemas no código?
1. Faça um fork
2. Crie uma branch para você (git checkout -b sua-branch)
3. Commit suas alterações (git commit -am 'Adicionando determinada funcionalidade')
4. Dê push em seus commits (git push origin sua-branch)
5. Crie um Pull Request de seu fork para o meu projeto :)

#Licensa
[MIT License][mit-license].
