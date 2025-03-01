import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Result } from 'src/domain/result';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './DTO/CreateQuestionDto';


@Controller('/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/')
  async getQuestions() {
    return Result.ok(await this.questionsService.getQuestions());
  }

  @Get('/:id')
  async getQuestionById(@Param('id') id: string) {
    return Result.ok(await this.questionsService.getQuestionById(id));
  }

  @Post('/')
  async createQuestion(@Req() req, @Body() data: CreateQuestionDto) {
    const userId = req.user.id
    return Result.ok(await this.questionsService.createQuestion(data, userId));
  }

  @Put('/:id')
  async updateQuestion(@Req() req, @Param('id') id: string, @Body() data: CreateQuestionDto) {
    const userId = req.user.id
    return Result.ok(await this.questionsService.updateQuestion({data, id, userId}));
  }
}