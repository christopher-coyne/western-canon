import { Controller, Post } from "@nestjs/common";

@Controller('recommendations')
export class RecommendationsController {

    @Post('')
    createRecommendation(): string {
        return 'creates a recommendation';
    }
}