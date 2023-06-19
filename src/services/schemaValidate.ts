import * as yup from "yup";

export const schema = yup.object().shape({
  nickname: yup
    .string()
    .max(30, "Максимальная длина никнейма - 30 символов")
    .matches(/^[a-zA-Z0-9]+$/, "Никнейм может содержать только буквы и цифры")
    .required("Требуется никнейм"),
  name: yup
    .string()
    .max(50, "Максимальная длина имени - 50 символов")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Имя может содержать только буквы")
    .required("Требуется имя"),
  surname: yup
    .string()
    .max(50, "Максимальная длина фамилии - 50 символов")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Фамилия может содержать только буквы")
    .required("Требуется фамилия"),
  phone: yup
    .string()
    .matches(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Некорректный формат номера телефона"
    )
    .required("Требуется номер телефона"),
  email: yup.string().email("Некорректный email").required("Требуется почта"),
  sex: yup
    .mixed()
    .oneOf(["man", "woman"], "Выберите пол")
    .required("Требуется указать пол"),
});
