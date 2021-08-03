const fs = require('fs/promises')

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

let contactsFile = 'contactsFile.json';
let myPerson = new Person('Thomas', 'Anderson', '49');

myPerson.writeReadNRemoveJson(contactsFile);