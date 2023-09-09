import * as Yup from 'yup';

export const quizDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Quiz name is required'),
  description: Yup.string().required('Description is required'),
  timeLimit: Yup.number()
    .typeError('Time limit must be a number')
    .required('Time limit is required')
    .min(1, 'Time limit must be at least 1 minute'),
})

export const quizQueSchema = Yup.object().shape({
  question: Yup.string().required('Question name is required'),
  option1: Yup.string().required('Option 1 is required'),
  option2: Yup.string().required('Option 2 is required')
    .test('is-unique-option', 'Options must be different', function (value) {
      const { option1 } = this.parent;
      return option1 !== value;
    }),
  option3: Yup.string().required('Option 3 is required')
    .test('is-unique-option', 'Options must be different', function (value) {
      const { option1, option2 } = this.parent;
      return option1 !== value && option2 !== value;
    }),
  option4: Yup.string().required('Option 4 is required')
    .test('is-unique-option', 'Options must be different', function (value) {
      const { option1, option2, option3 } = this.parent;
      return option1 !== value && option2 !== value && option3 !== value;
    }),
  correctAnswer: Yup
    .string()
    .required('Correct answer is required')
    .test('is-correct-answer-valid', 'Correct answer must be one of the provided options', function (value) {
      const { option1, option2, option3, option4 } = this.parent;
      return [option1, option2, option3, option4].includes(value);
    }),
})
