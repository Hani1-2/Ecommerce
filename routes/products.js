const express = require('express');
const router = express.Router();
const {database} = require('../config/helper');

/* GET products. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });

    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.cat_id = p.cat_id`
            }
        ])
        .withFields(['c.category as category',
            'p.Prod_name as name',
            'p.Price',
            'p.Prod_id'
        ])
        .slice(startValue, endValue)
        .sort({Prod_id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No products found"});
            }
        })
        .catch(err => console.log(err));
});

 /* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    console.log(productId);



    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.cat_id = p.cat_id`
            }
        ])
        .withFields(['c.category as category',
            'p.Prod_name as name',
            'p.Price',
            'p.Prod_id',
        ])
        .filter({'p.Prod_id': productId})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
}); 

/* GET ALL PRODUCTS FROM ONE CATEGORY */
router.get('/category/:catName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const cat_title = req.params.catName;

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.cat_id = p.cat_id WHERE c.category LIKE '%${cat_title}%'`
            }
        ])
        .withFields(['c.category as category',
            'p.Prod_name as name',
            'p.Price',
            'p.Prod_id'
        ])
        .slice(startValue, endValue)
        .sort({Prod_id: 1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products found matching the category ${cat_title}`});
            }
        }).catch(err => res.json(err));

});




module.exports = router;
