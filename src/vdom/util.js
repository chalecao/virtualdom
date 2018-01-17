const isType = (type) => (val) => {
    return typeof val == type
}

export const isNumber = isType("number")
export const isString = isType("string")
export const isBoolean = isType("boolean")