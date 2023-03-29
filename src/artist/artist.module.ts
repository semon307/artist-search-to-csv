import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [],
  providers: [ArtistService],
})
export class ArtistModule {}
