import { Injectable } from "@nestjs/common";
import { OpenAiService } from "src/openai/openAi.service";

@Injectable()
export class LlmService {
    constructor(private openAiService: OpenAiService) { }

    async generateResponse(prompt: string, validator: any, validatorName: string): Promise<string> {
        return await this.openAiService.generateResponse(prompt, validator, validatorName)
    }

}