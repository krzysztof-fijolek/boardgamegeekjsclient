import { BggCollectionClient, BggFamilyClient, BggSearchClient, BggThingClient } from '../../../src/client';
import { BggCollectionDtoParser, BggFamilyDtoParser, BggSearchDto, BggSearchDtoParser, BggThingDto, BggThingDtoParser } from '../../../src/dto';
import { TextFetcher } from '../../../src/fetcher';
import { GenericQueryBuilder } from '../../../src/query';
import { ICollectionRequest, IFamilyRequest, ISearchRequest, IThingRequest } from '../../../src/request';
import { XmlResponseParser } from '../../../src/responseparser';
import { TextResponseByEndpoint } from '../utils';

jest.mock('../../../src/fetcher')
jest.mock('../../../src/responseparser')
jest.mock('../../../src/dto')


const textFetcherMock = TextFetcher as jest.MockedClass<typeof TextFetcher>
const xmlResponseParserMock = XmlResponseParser as jest.MockedClass<typeof XmlResponseParser>
const bggThingDtoParserMock = BggThingDtoParser as jest.MockedClass<typeof BggThingDtoParser>

beforeEach(() => {
    jest.clearAllMocks();
});

describe('BggClients', () => {
    describe('IBggThingClient', () => {
        const thingClient: BggThingClient = new BggThingClient(new GenericQueryBuilder<IThingRequest>(), textFetcherMock.prototype, xmlResponseParserMock.prototype, bggThingDtoParserMock.prototype);

        test('should call dependency one times each', async () => {
            textFetcherMock.prototype.doFetch.mockImplementation((query) => {
                return new Promise((resolve) => {
                    resolve(TextResponseByEndpoint[query]);
                });
            })

            xmlResponseParserMock.prototype.parseResponse.mockResolvedValue({})

            bggThingDtoParserMock.prototype.jsonToDto.mockResolvedValue([])

            const data = await thingClient.query({ id: 174430 });

            expect(textFetcherMock.prototype.doFetch).toHaveBeenCalledTimes(1);
            expect(xmlResponseParserMock.prototype.parseResponse).toHaveBeenCalledTimes(1);
            expect(bggThingDtoParserMock.prototype.jsonToDto).toHaveBeenCalledTimes(1);
        });
    });
    describe('IBggSearchClient', () => {

        const bggSearchDtoParserMock = BggSearchDtoParser as jest.MockedClass<typeof BggSearchDtoParser>

        const searchClient: BggSearchClient = new BggSearchClient(new GenericQueryBuilder<ISearchRequest>(), textFetcherMock.prototype, xmlResponseParserMock.prototype, bggSearchDtoParserMock.prototype);

        test('should call dependency one times each', async () => {
            textFetcherMock.prototype.doFetch.mockImplementation((query) => {
                return new Promise((resolve) => {
                    resolve(TextResponseByEndpoint[query]);
                });
            })

            xmlResponseParserMock.prototype.parseResponse.mockResolvedValue({})

            bggSearchDtoParserMock.prototype.jsonToDto.mockResolvedValue([])

            const data: BggSearchDto[] = await searchClient.query({ query: "Gloom" });

            expect(textFetcherMock.prototype.doFetch).toHaveBeenCalledTimes(1);
            expect(xmlResponseParserMock.prototype.parseResponse).toHaveBeenCalledTimes(1);
            expect(bggSearchDtoParserMock.prototype.jsonToDto).toHaveBeenCalledTimes(1);
            expect(data.length > 0);
        });
    });
});
