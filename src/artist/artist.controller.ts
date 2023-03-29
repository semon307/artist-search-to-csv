import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { QUERY_VALIDATION_ERROR } from './constants/query-validation-error';
import { instance } from '../external-api-common/instance';
import { makeRequestUrl } from '../external-api-common/make-request-url';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get(':query?/:fileName?')
  async get(
    @Param('query') query: string = null,
    @Param('fileName') fileName: string = null,
  ) {
    if (!query) {
      throw new BadRequestException(QUERY_VALIDATION_ERROR);
    }

    let res;

    try {
      res = await instance.get(makeRequestUrl(query));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }

    await this.artistService.writeArtistsInCSVFile(
      res.data.results.artistmatches.artist,
      fileName,
    );

    return this.artistService.getArtistNames(
      res.data.results.artistmatches.artist,
    );
  }
}
