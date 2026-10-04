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
    constructor({id , title , image , price , description}) {
        this.id = id;
        this.title = title , 
        this.image = image , 
        this.price = price , 
        this.description = description;

        let temp = 0;
        for(const c of String(this.price)) {
            if ('0' <= c && c <= '9') temp = temp * 10 + Number(c); 
        }
        this.price = temp;
    }

    save() {
        if (this.id) {
            getProductFile(products => {
                const index = products.findIndex(p => p.id === this.id);
                products[index] = this;
                Product.savefile(products);
            });
        }
        else {
            this.id = Math.random().toString();
            getProductFile(products => {
                products.push(this);
                Product.savefile(products);
            });
        }
    }

    static savefile(products) {
        fs.writeFile(p , JSON.stringify(products) , (err) => {
            console.log(err);
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