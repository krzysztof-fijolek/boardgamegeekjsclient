import { JsonParser } from "jackson-js";
import { BggForumDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggForumDtoParser implements IDtoParser<BggForumDto> {
    parser: JsonParser<BggForumDto>;
    constructor() {
        this.parser = new JsonParser<BggForumDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggForumDto[]> {
        return new Promise<BggForumDto[]>((resolve) => {
            resolve(
                this.parser.transform(jsonData.forum, {
                    mainCreator: () => [Array, [BggForumDto]]
                })
            );
        });
    }

}