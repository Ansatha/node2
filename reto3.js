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

    writeReadNRemoveJson(fileJson){
        let objetToTxt = JSON.stringify(this);
        fs.writeFile(fileJson, objetToTxt)
        .then( ()=>{
            console.log('\n\x1b[36m%s\x1b[0m', 'Reto 2.');
            console.log('1. Archivo "' + fileJson + '" creado. (1/4 OK)');
            return fs.readFile(fileJson);
        })
        .then( data => {
            console.log('\n2. Archivo "' + fileJson + '" leido. (2/4 OK)');
            console.log('\n3. Contenido de "' + fileJson + '" en pantalla. (3/4 OK)')
            console.log(JSON.parse(data));
            console.log('\nELIMINANDO archivo "' + fileJson + '" (4/4 PENDING)')
            setTimeout(()=>{return fs.rm(fileJson)}, 4000);

        })
        .then( ()=>{
            setTimeout(()=>{console.log('4. Archivo "' + fileJson + '" eliminado. (4/4 OK)' + '\n')}, 7000);
        })
        .catch(error => {
            console.log(error)
        });
    };
};


function createObjet (){
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
    readlineQuestion('Nombre: ')
    .then(answer =>{
        arrayArguments.push(answer);
        return readlineQuestion('Apellido: ');
    })
    .then(answer =>{
        arrayArguments.push(answer);
        return readlineQuestion('Edad: ')
    })
    .then(answer =>{
        arrayArguments.push(answer);
        rl.close();
        let myPerson = new Person(arrayArguments[0], arrayArguments[1], arrayArguments[2]);
        let contactsFile = 'contactsFile.json';
        myPerson.writeReadNRemoveJson(contactsFile);
    })
    .catch (error => {
        console.log(error);
    });
}

createObjet();