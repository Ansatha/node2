const fs = require('fs/promises');
const readline = require('readline');

class Person {
    name;
    surname;
    age;

    constructor(name, surname, age){
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
};

async function writeReadNRemoveJson(fileJson, theObjet){
    const objetToTxt = JSON.stringify(theObjet);
    try {
        await fs.writeFile(fileJson, objetToTxt);
        console.log('\n\x1b[36m%s\x1b[0m', 'Reto 2b.');
        console.log('1. Archivo "' + fileJson + '" creado. (1/4 OK)');

        const data2 = await fs.readFile(fileJson);
        console.log('\n2. Archivo "' + fileJson + '" leido. (2/4 OK)');
        console.log('\n3. Contenido de "' + fileJson + '" en pantalla. (3/4 OK)')
        console.log(JSON.parse(data2));
        console.log('\nELIMINANDO archivo "' + fileJson + '" (4/4 PENDING)')
        setTimeout(()=>{fs.rm(fileJson)}, 4000);
        setTimeout(()=>{console.log('4. Archivo "' + fileJson + '" eliminado. (4/4 OK)' + '\n')}, 5000);
    }
    catch (error) {
        console.log(error);
    }
};


async function createObjet (){
    let arrayArguments = [];
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function readlineQuestion(pregunta){
        const question = new Promise((resolve, reject) => {
            rl.question(pregunta, (respuesta) => {
                resolve(respuesta)
            });
        });
        return question;
    };
    try {
        const answer1 = await readlineQuestion('Nombre: ');
        arrayArguments.push(answer1);
        
        const answer2 = await readlineQuestion('Apellido: ');
        arrayArguments.push(answer2);
    
        const answer3 = await readlineQuestion('Edad: ');
        arrayArguments.push(answer3);
        rl.close();

        let myPerson = new Person(arrayArguments[0], arrayArguments[1], arrayArguments[2]);
        let contactsFile = 'contactsFile.json';
        writeReadNRemoveJson(contactsFile, myPerson);
    }
    catch (error) {
        console.log(error);
    };
};

createObjet();