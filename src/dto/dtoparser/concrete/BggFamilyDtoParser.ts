import { JsonParser } from "jackson-js";
import { BggFamilyDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggFamilyDtoParser implements IDtoParser<BggFamilyDto> {
  parser: JsonParser<BggFamilyDto>;
  constructor() {
    this.parser = new JsonParser<BggFamilyDto>();
    this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
  }
  jsonToDto(jsonData: any): Promise<BggFamilyDto[]> {
    return new Promise<BggFamilyDto[]>((resolve) => {
      resolve(
        this.parser.transform(jsonData.items[0].item, {
          mainCreator: () => [Array, [BggFamilyDto]]
        })
      );
    });
  }
}