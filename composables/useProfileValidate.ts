import Joi from 'joi'

export default function useProfileValidate(profile: object) {
	const schema = Joi.object({
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

	const { error } = schema.validate(profile)

	return { error }
}
