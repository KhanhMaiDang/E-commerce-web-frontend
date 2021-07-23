import axios from 'axios'

//const PRODUCT_REST_API_URL = 'http://localhost:8080/api/bookstore'

class ProductService {
    getAllProducts() {
        axios.get('/api/bookstore/public/books');
    }
}

export default new ProductService();