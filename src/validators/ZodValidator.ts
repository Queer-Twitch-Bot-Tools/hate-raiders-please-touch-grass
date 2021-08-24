import { Errors, Validators, GenericObject } from "moleculer";
import type { z } from "zod";

export default class ZodValidator extends Validators.Base {
    constructor() {
        super();
    }

    compile(schema: z.SomeZodObject) {
        return (params: GenericObject) => this.validate(params, schema);
    }

    validate(params: GenericObject, schema: z.SomeZodObject) {
        const res = schema.safeParse(params);
        
        if (!res.success) throw new Errors.MoleculerClientError("Validation failed!", 501, "VALIDATION_FAILED", res.error);

        return true;
    }
}