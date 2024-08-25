interface Resort {
  _id: string;
  name: string;
  countryCode: string;
  createdBy: User;
  description: string;
  topElevation: number;
  minElevation: number;
  totalSlopesLength: number;
  numberOfLifts: number;
  gpsCoordinates: number[];
  iconImage: string;
  coverImage: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

interface User {
  _id: string;
  username: string;
  email: string;
  dob: Date;
  role: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Admin extends User {
  level: number;
}

export type { Resort, Item, User, Admin };