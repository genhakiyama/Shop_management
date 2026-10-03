const fs = require('fs');
const path = require('path');
const rootDir = require('../Helpers/path');

const p = path.join(rootDir , 'data' , 'product.json');

const getProductFile = cb => {
    fs.readFile(p , (err , fileContent) => {
        if (err) return cb([]);
        return cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor({title , image , price , description}) {
        this.title = title , 
        this.image = image , 
        this.price = price , 
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getProductFile(products => {
            products.push(this);
            fs.writeFile(p , JSON.stringify(products) , (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(products){
        getProductFile(products);
    }

    static FindbyID(id , cb) {
        getProductFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};