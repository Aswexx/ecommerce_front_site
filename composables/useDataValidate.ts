import Joi from 'joi'

type FormType = 'profile' | 'delivery' | 'contact'

const validateProps = {
  name: Joi.string().min(2).max(25).required().messages({
    'string.empty': '姓名不能為空',
    'string.min': '姓名字數過短',
    'string.max': '姓名字數過長'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'email 不能為空',
      'string.email': 'email 格式有誤'
    }),
  phone: Joi.string()
    .length(10)
    .pattern(/^(09)[0-9]{8}$/)
    .required()
    .messages({
      'string.empty': '手機號不能為空',
      'string.length': '手機號長度必須為 10 碼',
      'string.pattern.base': '手機號格式必須為 09 開頭全數字'
    }),
  address: Joi.string()
    .regex(/^.{2}(縣|市)/)
    .required()
    .messages({
      'string.empty': '地址不能為空',
      'string.pattern.base': '需選擇縣市'
    })
}

export default function useDataValidate(formType: FormType, data: object) {
  let schema
  if (formType === 'profile') {
    schema = Joi.object({
      name: validateProps.name,
      birthday: Joi.string().required(),
      address: validateProps.address,
      phone: validateProps.phone,
      subscription: Joi.boolean().required()
    })
  } else if (formType === 'delivery') {
    schema = Joi.object({
      name: validateProps.name,
      address: validateProps.address,
      phone: validateProps.phone,
      email: validateProps.email
    })
  } else if (formType === 'contact') {
    schema = Joi.object({
      name: validateProps.name,
      phone: validateProps.phone,
      email: validateProps.email,
      type: Joi.string().required().messages({
        'string.empty': '請選擇聯絡項目'
      }),
      content: Joi.string().required().messages({
        'string.empty': '內容不能為空'
      })
    })
  }
  
  const { error } = schema!.validate(data)

  return { error }
}
