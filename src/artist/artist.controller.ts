import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PARTY_NOT_FOUND } from './constants/party-not-found';
import { CreatePartyDto } from './dto/create-party.dto';
import { PartyModel } from './party.model/party.model';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreatePartyDto) {
    return this.partyService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const party = await this.partyService.findById(id);
    if (!party) {
      throw new NotFoundException(PARTY_NOT_FOUND);
    }
    return party;
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/all')
  async find() {
    return this.partyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProfile = await this.partyService.deleteById(id);
    if (!deletedProfile) {
      throw new HttpException(PARTY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: PartyModel,
  ) {
    const party = await this.partyService.updateById(id, dto);
    if (!party) {
      throw new NotFoundException(PARTY_NOT_FOUND);
    }
    return party;
  }
}
