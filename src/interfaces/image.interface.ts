export interface ImageInterface {
    name: string;
    originalName: string;
    url: string;
    format: string;
    bytes: number;
    width: number;
    height: number;
  }
  
  export interface ImgPreviewInterface extends ImageInterface {
    file: File | null;
  }
  