import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { Artist } from './artist';

@Injectable()
export class ArtistService {
  private mapArtistForRecord(artist: Artist) {
    let image = 'not found';
    let image_small = 'not found';
    artist.image.forEach((el) => {
      if (el?.size === 'medium' && el['#text']) image = el['#text'];
      if (el?.size === 'small' && el['#text']) image_small = el['#text'];
    });

    return {
      name: artist?.name || 'not found',
      mbid: artist?.mbid || 'not found',
      url: artist?.url || 'not found',
      image,
      image_small,
    };
  }

  private mapArtistName(artist: Artist) {
    return artist.name;
  }

  async writeArtistsInCSVFile(artists: Array<Artist>, userFileName: string) {
    const fileName = userFileName || 'test';

    const csvWriter = createObjectCsvWriter({
      path: `./${fileName}.csv`,
      header: [
        { id: 'name', title: 'name' },
        { id: 'mbid', title: 'mbid' },
        { id: 'url', title: 'url' },
        { id: 'image_small', title: 'image_small' },
        { id: 'image', title: 'image' },
      ],
    });

    csvWriter.writeRecords(artists.map(this.mapArtistForRecord)).then((res) => {
      console.log('...Done!');
    });
  }

  getArtistNames(artists: Array<any>) {
    return artists.map(this.mapArtistName);
  }
}
