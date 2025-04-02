import { Controller, Get } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GenreDto } from "./DTO/response/genre.dto";

@ApiTags("genres")
@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: "Get all genres" })
  @ApiResponse({
    type: GenreDto,
    isArray: true,
    description: "Returns all genres sorted alphabetically",
  })
  findAll() {
    return this.genreService.findAll();
  }
}
