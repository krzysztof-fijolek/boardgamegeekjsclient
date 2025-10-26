import { JsonParser, ObjectMapper } from "jackson-js";
import { BggPlayDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggPlayDtoParser implements IDtoParser<BggPlayDto> {
    parser: JsonParser<BggPlayDto>;
    mapper: ObjectMapper;
    constructor() {
        this.parser = new JsonParser<BggPlayDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggPlayDto[]> {
        return new Promise<BggPlayDto[]>((resolve) => {
            resolve(
                this.parser.transform(jsonData.plays, {
                    mainCreator: () => [Array, [BggPlayDto]]
                })
            );
        });
    }

}