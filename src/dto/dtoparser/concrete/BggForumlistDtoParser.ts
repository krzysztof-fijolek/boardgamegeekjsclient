import { JsonParser } from "jackson-js";
import { BggForumlistDto } from "../../concrete/BggForumlistDto";
import { IDtoParser } from "../interface";

export class BggForumlistDtoParser implements IDtoParser<BggForumlistDto> {
    parser: JsonParser<BggForumlistDto>;
    constructor() {
        this.parser = new JsonParser<BggForumlistDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggForumlistDto[]> {
        return new Promise<BggForumlistDto[]>((resolve) => {
            resolve(
              this.parser.transform(jsonData.forums, {
                mainCreator: () => [Array, [BggForumlistDto]]
              })
            );
        });
    }

}