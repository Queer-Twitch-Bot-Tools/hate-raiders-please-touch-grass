import { ServiceBroker, Service, Context } from "moleculer";
import { z } from "zod";

import ZodValidator from "./validators/ZodValidator";

const broker = new ServiceBroker({
    logger: true,
    validator: new ZodValidator
});

const testValidator = z.object({
    thing: z.string()
});

class test extends Service {
    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "test",
            actions: {
                // @ts-ignore
                test: this.testAction
            }
        });
    }

    public testAction = {
        name: "test",
        params: testValidator,
        handler: this.test
    }

    public async test(ctx: Context<z.infer<typeof testValidator>>) {
        console.log("weh")
    }
}

broker.createService(test);

broker.start().then(() => {
    broker.call("test.test", { thing: "eh" });
    broker.call("test.test", { thing: 2312321 });
})