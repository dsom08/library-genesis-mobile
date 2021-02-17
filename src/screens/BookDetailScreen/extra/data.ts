import { ProductDetails } from "src/screens/product-details-2/extra/data";

export class Book {

  constructor(readonly md5: string,
              readonly thumbnail: string,
              readonly title: string,
              readonly author: string,
              readonly publisher: string,
              readonly year: string,
              readonly edition: string,
              readonly langauge: string,
              readonly pages: string,
              readonly id: string,
              readonly size: string,
              readonly extension: string,
              readonly details: BookDetails[]) {
  }
}

export class BookDetails {
  constructor(readonly title: string,
              readonly description: string) {
  }

  static yearDetail(year: string): BookDetails {
    return new BookDetails('Year', year);
  }

  static languageDetail(language: string): BookDetails {
    return new BookDetails('Language', language);
  }

  static extensionDetail(extension: string) {
    return new BookDetails('File', extension);
  }
}