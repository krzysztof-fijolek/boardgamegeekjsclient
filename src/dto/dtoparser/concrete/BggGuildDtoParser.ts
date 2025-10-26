import { JsonParser } from "jackson-js";
import { BggGuildDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggGuildDtoParser implements IDtoParser<BggGuildDto> {
    parser: JsonParser<BggGuildDto>;
    constructor() {
        this.parser = new JsonParser<BggGuildDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggGuildDto[]> {
        return new Promise<BggGuildDto[]>((resolve) => {
            resolve(
                this.parser.transform(jsonData.guild, {
                    mainCreator: () => [Array, [BggGuildDto]]
                })
            );
        });
    }

}