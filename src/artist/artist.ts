export type Artist = {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Array<Image>;
};

type Image = {
  ['#text']: string;
  size: ImageSize;
};

enum ImageSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extralarge',
  MEGA = 'mega',
}
