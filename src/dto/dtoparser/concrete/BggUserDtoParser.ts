import { JsonParser } from "jackson-js";
import { BggUserDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggUserDtoParser implements IDtoParser<BggUserDto> {
    parser: JsonParser<BggUserDto>;
    constructor() {
        this.parser = new JsonParser<BggUserDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggUserDto[]> {
        return new Promise<BggUserDto[]>((resolve) => {
            resolve(
                this.parser.transform(jsonData.user, {
                    mainCreator: () => [Array, [BggUserDto]]
                })
            );
        });
    }
}