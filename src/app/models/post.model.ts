import { IUser, User } from './user.model';

interface Post {
  id: number;
  creatorId: number;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  priceInDollar: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  creator: IUser;
}

enum ELebanonCity {
  // All
  LEBANON = 'LEBANON',

  // Beirut
  BEIRUT = 'BEIRUT',

  // Mount Lebanon
  ALEY = 'ALEY',
  BAABDA = 'BAABDA',
  BASKINTA = 'BASKINTA',
  BEIT_MERY = 'BEIT_MERY',
  BIKFAYA = 'BIKFAYA',
  BSHARRI = 'BSHARRI',
  CHOUF = 'CHOUF',
  DBAYEH = 'DBAYEH',
  DHOUR_EL_CHOUEIR = 'DHOUR_EL_CHOUEIR',
  JBEIL = 'JBEIL',
  JOUNIEH = 'JOUNIEH',
  KESERWAN = 'KESERWAN',
  MATN = 'MATN',
  METN = 'METN',
  SIN_EL_FIL = 'SIN_EL_FIL',

  // North Governorate
  AKKAR = 'AKKAR',
  BATROUN = 'BATROUN',
  BCHARRE = 'BCHARRE',
  KOURA = 'KOURA',
  MINIEH_DANNIYEH = 'MINIEH_DANNIYEH',
  TRIPOLI = 'TRIPOLI',
  ZGHARTA = 'ZGHARTA',

  // South Governorate
  JEZZINE = 'JEZZINE',
  NABATIYEH = 'NABATIYEH',
  SIDON = 'SIDON',
  TYRE = 'TYRE',

  // Bekaa
  BAALBEK = 'BAALBEK',
  HERMEL = 'HERMEL',
  RASHAYA = 'RASHAYA',
  WEST_BEKAA = 'WEST_BEKAA',
}

const ALebanonCity = [
  ELebanonCity.AKKAR,
  ELebanonCity.ALEY,
  ELebanonCity.BAABDA,
  ELebanonCity.BAALBEK,
  ELebanonCity.BASKINTA,
  ELebanonCity.BATROUN,
  ELebanonCity.BCHARRE,
  ELebanonCity.BEIRUT,
  ELebanonCity.BEIT_MERY,
  ELebanonCity.BIKFAYA,
  ELebanonCity.BSHARRI,
  ELebanonCity.CHOUF,
  ELebanonCity.DBAYEH,
  ELebanonCity.DHOUR_EL_CHOUEIR,
  ELebanonCity.HERMEL,
  ELebanonCity.JBEIL,
  ELebanonCity.JEZZINE,
  ELebanonCity.JOUNIEH,
  ELebanonCity.KESERWAN,
  ELebanonCity.KOURA,
  ELebanonCity.MATN,
  ELebanonCity.METN,
  ELebanonCity.MINIEH_DANNIYEH,
  ELebanonCity.NABATIYEH,
  ELebanonCity.RASHAYA,
  ELebanonCity.SIDON,
  ELebanonCity.SIN_EL_FIL,
  ELebanonCity.TRIPOLI,
  ELebanonCity.TRIPOLI,
  ELebanonCity.TYRE,
  ELebanonCity.WEST_BEKAA,
  ELebanonCity.ZGHARTA,
];

interface SearchQueries {
  searchTerm?: string;
  location?: string;
}

export { Post, ELebanonCity, ALebanonCity, SearchQueries };
