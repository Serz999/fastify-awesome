import { ModelStatic, Model } from "sequelize"
import { CRUD, Request, Response, ObjectsWrapp} from "./types"


class BaseController implements CRUD {

    constructor(Model: ModelStatic<Model<any, any>>) {
        this.Model = Model
    }

    private Model: ModelStatic<Model<any, any>>

    async add(request: Request , response: Response): Promise<Object> { 
        const body: any = request.body!
        const inst = await this.Model.create(body)
        
        return inst
    }

    async getAll(request: Request , response: Response): Promise<ObjectsWrapp> {
        const allInsts = await this.Model.findAll()

        return {
            totalCount: allInsts.length,
            objects: allInsts
        }
    }

    async getById(request: Request , response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }  
        } 
        
        return inst
    }

    async update(request: Request , response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }
        }

        await inst.update(request.body)
        await inst.save()

        return inst
   }

    async delete(request: Request, response: Response): Promise<Object> {
        const inst = await this.Model.findByPk(request.params.id)

        if (!inst) {
            response.code(404)
            return { message: `${this.Model.name} not found` }   
        }

        await inst.destroy()

        return {}
    }
}

export { BaseController }