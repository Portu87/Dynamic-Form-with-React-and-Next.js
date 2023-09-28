import { ImageInterface } from './image.interface';
export interface CategoryInterface {
    id: string;
    name: string;
    description: string;   
    image: ImageInterface;
}