import { JsonParser } from "jackson-js";
import { BggThreadDto } from "../../concrete";
import { IDtoParser } from "../interface";

export class BggThreadDtoParser implements IDtoParser<BggThreadDto> {
    parser: JsonParser<BggThreadDto>;
    constructor() {
        this.parser = new JsonParser<BggThreadDto>();
        this.parser.defaultContext.features!.deserialization.FAIL_ON_UNKNOWN_PROPERTIES = false;
    }
    jsonToDto(jsonData: any): Promise<BggThreadDto[]> {
        return new Promise<BggThreadDto[]>((resolve) => {
            resolve(
                this.parser.transform(jsonData.thread, {
                    mainCreator: () => [Array, [BggThreadDto]]
                })
            );
        });
    }
}