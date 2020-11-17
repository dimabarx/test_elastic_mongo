const { elastic } = require("./lib/elastic/elastic"); // типу своя ліба по роботі з еластіком
const  { mongo }  = require("./lib/mongo/mongo"); // типу своя ліба по роботі з монго

/// при викоритсанні конструкції { mongo }  я отримую прямо доступ до того шо експортував


const jsmediatags = require("jsmediatags");
const testFolder = './mymyzika/';
const fs = require('fs');




function init () {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {

            jsmediatags.read(testFolder + file, {
                onSuccess: function (tag) {
                    /// смикаю метод можна і додаткові якісь параметри кидать

                     mongo("один хер шось передават треба шоб визвать цю дрять або залишити пустим ").insertWork(tag.tags , "work2");

                   elastic().createIndex(tag.tags);



                    console.log(tag.tags) ;
                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                }
            });
        });
    })

}

init();