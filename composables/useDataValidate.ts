import Joi from 'joi'

type FormType = 'profile' | 'delivery' | 'contact'

const validateProps = {
  name: Joi.string().min(2).max(25).required().messages({
    'string.empty': '姓名不能為空',
    'string.min': '姓名字數過短',
    'string.max': '姓名字數過長'
  })
}

export default function useDataValidate(formType: FormType, data: object) {
  let schema
  if (formType === 'profile') {
    schema = Joi.object({
      name: validateProps.name,
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
      name: validateProps.name,
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
  } else if (formType === 'contact') {
    schema = Joi.object({
      name: validateProps.name,
      phone: Joi.string()
        .length(10)
        .pattern(/^(09)[0-9]{8}$/)
        .required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      type: Joi.string().required(),
      content: Joi.string().required()
    })
  }
  
  const { error } = schema!.validate(data)

  return { error }
}
