import { FastifyInstance } from "fastify";
import orderController from '../controllers/orders'


async function ordersRoute(fastify: FastifyInstance, options: Object) {

    fastify.get('/api/orders', orderController.getAll.bind(orderController))

    fastify.get('/api/orders/:id', orderController.getById.bind(orderController))

    fastify.post('/api/orders/', orderController.add.bind(orderController))
    
    fastify.patch('/api/orders/:id', orderController.update.bind(orderController))

    fastify.delete('/api/orders/:id', orderController.delete.bind(orderController))
}

export { ordersRoute }