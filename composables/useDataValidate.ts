import Joi from 'joi'

type FormType = 'profile' | 'delivery'

export default function useDataValidate(formType: FormType, data: object) {
  let schema
  if (formType === 'profile') {
    schema = Joi.object({
      name: Joi.string().min(2).max(25).required(),
      birthday: Joi.string().required(),
      address: Joi.string()
        .regex(/^.{2}(縣|市)/)
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^(09)[0-9]{8}$/)
        .required(),
      subscription: Joi.boolean().required()
    })
  } else if (formType === 'delivery') {
    schema = Joi.object({
      name: Joi.string().min(2).max(25).required(),
      address: Joi.string()
        .regex(/^.{2}(縣|市)/)
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^(09)[0-9]{8}$/)
        .required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
    })
  }

  const { error } = schema!.validate(data)

  return { error }
}
