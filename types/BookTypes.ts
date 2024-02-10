import { z } from 'zod';

import { cleanDescription } from '~/utils/cleanDescription';

const IndustryIdentifier = z.object({
  type: z.string(),
  identifier: z.string(),
});

const ReadingModes = z.object({
  text: z.boolean(),
  image: z.boolean(),
});

const PanelizationSummary = z
  .object({
    containsEpubBubbles: z.boolean(),
    containsImageBubbles: z.boolean(),
  })
  .optional()
  .default({ containsEpubBubbles: false, containsImageBubbles: false });

// there will never be a default image. This is a work around to type the defualt image after transformation.
const ImageLinks = z
  .object({
    smallThumbnail: z.string(),
    thumbnail: z.string(),
    image: z.string().optional(),
  })
  .transform((links) => ({
    ...links,
    image: `${links.thumbnail}&fife=w594-h900`,
  }))
  .optional()
  .default({
    image: 'https://placehold.co/594x900',
    smallThumbnail: 'https://placehold.co/128x192',
    thumbnail: 'https://placehold.co/128x192',
  });

const ListPrice = z
  .object({
    amount: z.number(),
    currencyCode: z.string(),
  })
  .optional()
  .default({ amount: 0, currencyCode: '' });

const RetailPrice = z
  .object({
    amount: z.number(),
    currencyCode: z.string(),
  })
  .optional()
  .default({ amount: 0, currencyCode: '' });

const Offer = z.object({
  finskyOfferType: z.number(),
  listPrice: z.object({
    amountInMicros: z.number(),
    currencyCode: z.string(),
  }),
  retailPrice: z.object({
    amountInMicros: z.number(),
    currencyCode: z.string(),
  }),
  giftable: z.boolean().optional().default(false),
});

const Epub = z.object({
  isAvailable: z.boolean(),
  acsTokenLink: z.string().optional().default(''),
});

const Pdf = z.object({
  isAvailable: z.boolean(),
  acsTokenLink: z.string().optional().default(''),
});

const SaleInfo = z.object({
  country: z.string(),
  saleability: z.string(),
  isEbook: z.boolean(),
  listPrice: ListPrice,
  retailPrice: RetailPrice,
  buyLink: z.string().optional().default(''),
  offers: z.array(Offer).optional().default([]),
});

const AccessInfo = z.object({
  country: z.string(),
  viewability: z.string(),
  embeddable: z.boolean(),
  publicDomain: z.boolean(),
  textToSpeechPermission: z.string(),
  epub: Epub,
  pdf: Pdf.optional(),
  webReaderLink: z.string(),
  accessViewStatus: z.string(),
  quoteSharingAllowed: z.boolean(),
});

const VolumeInfo = z.object({
  title: z.string(),
  subtitle: z.string().optional().default(''),
  authors: z.array(z.string()).optional().default(['Unknown']),
  publisher: z.string().optional().default(''),
  publishedDate: z.string().optional().default(''),
  description: z
    .string()
    .transform((description) => cleanDescription(description))
    .optional()
    .default('No description'),
  industryIdentifiers: z.array(IndustryIdentifier).optional().default([]),
  readingModes: ReadingModes,
  pageCount: z.number().optional().default(0),
  printType: z.string().optional().default(''),
  categories: z.array(z.string()).optional().default(['N/A']),
  averageRating: z.number().optional().default(0),
  ratingsCount: z.number().optional().default(0),
  maturityRating: z.string(),
  allowAnonLogging: z.boolean(),
  contentVersion: z.string(),
  panelizationSummary: PanelizationSummary,
  imageLinks: ImageLinks,
  language: z.string(),
  previewLink: z.string(),
  infoLink: z.string(),
  canonicalVolumeLink: z.string(),
});

export const bookSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: VolumeInfo,
  saleInfo: SaleInfo,
  accessInfo: AccessInfo,
});

export const booksApiResponseSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(bookSchema),
});

export type Book = z.infer<typeof bookSchema>;

export type BooksApiResponse = z.infer<typeof booksApiResponseSchema>;
