"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        id: "1",
        name: "mouse",
        price: 20,
        category: "periférico"
    },
    {
        id: "2",
        name: "SSD",
        price: 100,
        category: "hardware"
    }
];
exports.purchases = [
    {
        userId: "1",
        productId: "1",
        quantity: 3,
        totalPrice: 90
    },
    {
        userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: 250
    }
];
//# sourceMappingURL=database.js.map