export type PaginationLinks = {
    current: string,
    first: string,
    last: string,
    previous?: string,
    next?: string,
}

export type WithPagination<T> = {
    links: PaginationLinks,
    data: T,
    meta: any,
}