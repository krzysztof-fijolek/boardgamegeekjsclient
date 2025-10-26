import { JsonParser } from 'jackson-js';
import { BggThingDto } from '../../concrete';
import { IDtoParser } from '../interface';

export class BggThingDtoParser implements IDtoParser<BggThingDto> {
  parser: JsonParser<BggThingDto>;
  constructor() {
    this.parser = new JsonParser<BggThingDto>();
    this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES =
      false;
  }
  jsonToDto(jsonData: any): Promise<BggThingDto[]> {
    return new Promise<BggThingDto[]>((resolve) => {
      resolve(
        this.parser.transform(jsonData.items[0].item, {
          mainCreator: () => [Array, [BggThingDto]],
        })
      );
    });
  }
}
