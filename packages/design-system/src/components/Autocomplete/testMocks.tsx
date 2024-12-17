export type MockedDataResponse = {
  id: number;
  title: string;
  artist_title: string;
};

const mockedData: MockedDataResponse[] = [
  {
    artist_title: 'Vasily Kandinsky',
    id: 8980,
    title: 'Landscape with Two Poplars',
  },
  {
    artist_title: 'Katsushika Hokusai',
    id: 24645,
    title:
      'Under the Wave off Kanagawa (Kanagawa oki nami ura), also known as The Great Wave, from the series "Thirty-Six Views of Mount Fuji (Fugaku sanjūrokkei)"',
  },
  {
    artist_title: 'Eleanor Coen',
    id: 7030,
    title: 'Growing City',
  },
  {
    artist_title: 'Amédée Ozenfant',
    id: 68407,
    title: 'Landscape (Bordeaux II)',
  },
  {
    artist_title: 'Claude Monet',
    id: 4783,
    title: 'Poppy Field (Giverny)',
  },
  {
    artist_title: 'Kurt Seligmann',
    id: 62323,
    title: 'Magnetic Mountain',
  },
  {
    artist_title: 'Chaim Soutine',
    id: 59967,
    title: 'Landscape at Cagnes',
  },
  {
    artist_title: 'Gustave Moreau',
    id: 20579,
    title: 'Hercules and the Lernaean Hydra',
  },
  {
    artist_title: 'Frederic Edwin Church',
    id: 76571,
    title: 'View of Cotopaxi',
  },
  {
    artist_title: 'Albert Bierstadt',
    id: 146701,
    title: 'Mountain Brook',
  },
];

export const searchMock = {
  matcher: {
    name: 'artworkSearchSuccess',
    url: 'begin:https://api.artic.edu/api/v1/artworks/search',
    method: 'GET',
  },
  response: {
    status: 200,
    body: {
      data: mockedData,
    },
  },
};
