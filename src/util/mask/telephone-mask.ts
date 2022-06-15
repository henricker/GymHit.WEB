
export function telephoneMask(value: string) {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/^(\d{2})\.(\d{4})(\d)/, '($1) $2-$3')
    value = value.replace(/^(\d{2})\.(\d{4})\.(\d{4})/, '($1) $2-$3')
    return value;    
}