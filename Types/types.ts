export type UserDataType = {
  id: string;
  name: string;
  email: string;
  image: string;
  collections: Array<{
    course: string;
    year: number;
    subject: string;
    type: string;
    title: string;
    items: string[];
    created_at: Date;
    id: string;
  }>;
};