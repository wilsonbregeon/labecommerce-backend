"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromClientId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1",
        email: "fulano@labenu.com",
        password: "teste1"
    },
    {
        id: "2",
        email: "ciclano@labenu.com",
        password: "teste2"
    }
];
exports.products = [
    {
        id: "10",
        name: "mouse",
        price: 20,
        category: types_1.TCategory.PERIPHERAL
    },
    {
        id: "11",
        name: "SSD",
        price: 100,
        category: types_1.TCategory.HARDWARE
    },
    {
        id: "12",
        name: "Smart TV LG",
        price: 2000,
        category: types_1.TCategory.ELECTRONICS
    }
];
exports.purchases = [
    {
        userId: "1",
        productId: "10",
        quantity: 3,
        totalPrice: 60
    },
    {
        userId: "2",
        productId: "12",
        quantity: 1,
        totalPrice: 2000
    },
    {
        userId: "1",
        productId: "11",
        quantity: 2,
        totalPrice: 200
    }
];
function createUser(id, email, password) {
    exports.users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso!");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id,
        name,
        price,
        category
    });
    return ("Produto criado com sucesso!");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    return exports.products.find(product => product.id === id);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId,
        productId,
        quantity,
        totalPrice
    });
    return ("Compra realizada com sucesso!");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromClientId(clientIdToSearch) {
    return exports.purchases.filter(purchase => purchase.userId === clientIdToSearch);
}
exports.getAllPurchasesFromClientId = getAllPurchasesFromClientId;
//# sourceMappingURL=database.js.map