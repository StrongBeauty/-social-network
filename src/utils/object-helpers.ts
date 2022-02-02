export const updateObjectInArray = <T extends {}, D>(
    items: T[],
    itemId: any,
    objectPropName: keyof T,
    newObjProps: D,
) => {
        return items.map((i) => {
        if (i[objectPropName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i
    })
}


export type updateObjectInArrayType<T, D> = (
    items: T[],
    itemId: number | string,
    objectPropName: number | string,
    newObjProps: D
) => Omit<T[], keyof []>

type iType<T> = {[P in keyof T]?: T[P] extends object ? iType<T[P]> : T[P]}
