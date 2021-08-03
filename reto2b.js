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
};

async function writeReadNRemoveJson(fileJson, theObjet){
    const objetToTxt = JSON.stringify(theObjet);
    try {
        const data1 = await fs.writeFile(fileJson, objetToTxt);
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

let contactsFile = 'contactsFile.json';
let myPerson = new Person('Thomas', 'Anderson', '49');

writeReadNRemoveJson(contactsFile, myPerson);