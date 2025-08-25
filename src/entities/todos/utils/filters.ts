export const STATUS_FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    UNCOMPLETED: 'uncompleted',
    FAVORITES: 'favorites',
    ALL_USERS: 'all-users'
}

export const FILTER_TODOS_BY_STATUS = {
    ALL: [
        { label: 'All', value: STATUS_FILTERS.ALL },
        { label: 'Completed', value: STATUS_FILTERS.COMPLETED },
        { label: 'Uncompleted', value: STATUS_FILTERS.UNCOMPLETED },
        { label: 'Favorites ', value: STATUS_FILTERS.FAVORITES }
    ],
    DEFAULT: STATUS_FILTERS.ALL
}

export const FILTERS_TYPE = {
    STATUS_FILTER: 'status',
    USER_FILTER: 'user'
}
