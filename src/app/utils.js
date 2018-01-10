export const parseQueryToArray = (query) => {
    return query.split(',')
}

export const parseArrayToQuery = (a) => {
    let str = ''
    a.map((value, i) => {
        str = i === 0 ? str.concat(value) : str.concat(','+value)
    })
    return str
}


export const getInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}