const express = require('express');
const router = express.Router();
const {database} = require('../config/helper');
const crypto = require('crypto');

// GET ALL ORDERS
router.get('/', (req, res) => {
    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.order_id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.Prod_id = od.prod_id'
            },
            {
                table: 'users as u',
                on: 'u.user_id = o.user_id'
            }
        ])
        .withFields(['o.order_id', 'p.Prod_name', 'p.Price', 'u.username'])
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
});

//Get Single Order
router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    console.log(orderId);

    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.order_id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.Prod_id = od.prod_id'
            },
            {
                table: 'users as u',
                on: 'u.user_id = o.user_id'
            }
        ])
        .withFields(['o.order_id', 'p.Prod_name as name', 'p.Price', 'u.username'])
        .filter({'o.order_id': orderId})
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.json({message: `No orders found with orderId ${orderId}`});
            }
        }).catch(err => res.json(err));
});


// // Place New Order
router.post('/new', (req, res) => {
    let userId = req.body.userId;
    //let data = JSON.parse(req.body);
    //let {userId, products} = req.body;
    console.log(userId);
    //console.log(products);
});
//      if (userId !== null && userId > 0) {
//         database.table('orders')
//             .insert({
//                 user_id: userId
//             }).then((newOrderId) => {

//             if (newOrderId > 0) {
//                 products.forEach(async (p) => {

//                         let data = await database.table('products').filter({id: p.Prod_id}).withFields(['quantity']).get();



//                     let inCart = parseInt(p.incart);

//                     // Deduct the number of pieces ordered from the quantity in database

//                     if (data.quantity > 0) {
//                         data.quantity = data.quantity - inCart;

//                         if (data.quantity < 0) {
//                             data.quantity = 0;
//                         }

//                     } else {
//                         data.quantity = 0;
//                     }

//                     // Insert order details w.r.t the newly created order Id
//                     database.table('order_details')
//                         .insert({
//                             order_id: newOrderId,
//                             product_id: p.Prod_id,
//                             quantity: inCart
//                         }).then(newId => {
//                         database.table('products')
//                             .filter({id: p.Prod_id})
//                             .update({
//                                 quantity: data.quantity
//                             }).then(successNum => {
//                         }).catch(err => console.log(err));
//                     }).catch(err => console.log(err));
//                 });

//             } else {
//                 res.json({message: 'New order failed while adding order details', success: false});
//             }
//             res.json({
//                 message: `Order successfully placed with order id ${newOrderId}`,
//                 success: true,
//                 order_id: newOrderId,
//                 products: products
//             })
//         }).catch(err => res.json(err));
//     }

//     else {
//         res.json({message: 'New order failed', success: false});
//     }

// });

// // Payment Gateway
// router.post('/payment', (req, res) => {
//     setTimeout(() => {
//         res.status(200).json({success: true});
//     }, 3000)
//});


module.exports = router;
