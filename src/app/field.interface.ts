export interface Validator {
    name: String;
    Validator: any;
    message: String;
}


export interface FieldConfig {
    label?: String;
    name?: String;
    inputType?: String;
    options?: String[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];

}
