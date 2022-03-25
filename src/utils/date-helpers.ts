const fullDateConverter = (date: string) => {
    return new Date(date)
}

export const dateConverter = (date: string) => {
    return fullDateConverter(date).toLocaleString('en-Gb', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
        .replace(/\//g, '.')
}

export const timeConverter = (date: string) => {
    return fullDateConverter(date).toLocaleString('en-Gb', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

