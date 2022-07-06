import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json({ 
            success: true, 
            message: 'Get all products successfully!', 
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// GET PRODUCT
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json({ 
            success: true, 
            message: 'Get product successfully!', 
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// ADD PRODUCT
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedUser = await newProduct.save()

        res.status(200).json({ 
            success: true, 
            message: 'Add product successfully!', 
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export default router