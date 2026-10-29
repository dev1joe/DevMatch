import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) { }

  // POST /profiles
  @Post()
  async create(@Body() body: { name: string, email: string }) {
    return this.profileService.create(body);
  }

  // GET /profiles
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  // GET /profiles/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne({ id });
  }

  // PUT /profiles/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string, email: string }
  ) {
    return this.profileService.update({
      where: { id },
      data: body
    });
  }

  // DELETE /profiles/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  del(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.del({ id });
  }
}
