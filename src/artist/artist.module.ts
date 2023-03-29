import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PartyController } from './party.controller';
import { PartyModel } from './party.model/party.model';
import { PartyService } from './party.service';

@Module({
  controllers: [PartyController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PartyModel,
        schemaOptions: {
          collection: 'Party',
        },
      },
    ]),
  ],
  providers: [PartyService],
})
export class PartyModule {}
