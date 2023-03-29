import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { Artist } from './artist';
import { ObjectEncodingOptions, promises as fs } from 'fs';

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

  // method for reading json file
  async readFile(
    path: string,
    options: ObjectEncodingOptions & { flag?: string } = { encoding: 'utf-8' },
  ): Promise<string | Buffer> {
    return fs.readFile(path, options);
  }

  // method for creating CSV file, based on last.fm response
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

    csvWriter.writeRecords(artists.map(this.mapArtistForRecord)).then(() => {
      console.log('...Done!');
    });
  }

  async getRandomMockArtistsNames() {
    // reading json file from the root folder
    const response = await this.readFile('./mockArtists.json');
    const artistsNames = JSON.parse(response as string);
    // creating an array with random length and random elements from json file
    const result: Array<string> = [];
    const indexes = new Set<number>();
    const count = Math.random() * artistsNames.length;

    while (indexes.size < count) {
      const index = Math.floor(Math.random() * artistsNames.length);
      indexes.add(index);
    }

    for (const index of indexes) {
      result.push(artistsNames[index]);
    }

    return result;
  }

  getArtistNames(artists: Array<any>) {
    return artists.map(this.mapArtistName);
  }
}
