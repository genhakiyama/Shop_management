const fs = require('fs');
const path = require('path');
const rootDir = require('../Helpers/path');
const Product = require('./Product');

const p = path.join(rootDir , 'data' , 'Cart.json');

const getCartFile = cb => {
    fs.readFile(p , (err , fileContent) => {
        if (err) return cb([]);
        return cb(JSON.parse(fileContent));
    });
};

module.exports = class Cart {
    constructor({product , quantity}) {
            this.id = product.id;
            this.title = product.title;
            this.price = parseFloat(product.price);
            this.image = product.image;
            this.description = product.description;
            this.quantity = parseFloat(quantity);
    }

    static addCargo(id , val)  {
        val = parseFloat(val);
        getCartFile(existingCargo => {
            const index = existingCargo.findIndex(p => p.product.id == id);
            if (index != -1) {
                existingCargo[index].quantity += val;
                if (existingCargo[index].quantity == 0) existingCargo = existingCargo.filter(p => p.product.id != id);
                this.saveCart(existingCargo);
            }
            else if (val != -1) {
                Product.fetchAll(products => {
                    const product = products.find(p => p.id == id);
                    existingCargo.push({product : product , quantity : 1});
                    this.saveCart(existingCargo);
                });
            }
        });
    }

    static fetchAll(cart) {
        getCartFile(cart);
    }

    static saveCart(cart) {
        fs.writeFile(p , JSON.stringify(cart) , err => {
            console.log(err);
        });
    }
}