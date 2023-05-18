import { Query } from 'mongoose';
export interface QueryString {
    sort?: string;
    fields?: string;
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
}
export declare class ApiFeatures<T extends Document> {
    query: Query<T[], T>;
    queryString: QueryString;
    constructor(query: Query<T[], T>, queryString: QueryString);
    filter(): this;
    sort(): this;
    limitFields(): this;
    paginate(): this;
}
