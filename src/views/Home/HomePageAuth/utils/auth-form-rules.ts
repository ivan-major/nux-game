import {
    alpha,
    minLength,
    helpers,
} from '@vuelidate/validators'

const digitsAndSymbols = helpers.withMessage(
  'Only numbers and symbols are allowed, no letters',
  helpers.regex(/^[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/u)
)

export function returnAuthFormRules() {
    return {
        userName: {
            alpha,
            minLength: minLength(2)
        },
        phoneNumber: {
            digitsAndSymbols,
            minLength: minLength(2)
        },
    }
}
