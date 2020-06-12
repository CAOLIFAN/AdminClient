import ajax from './ajax'

const BASE = ''

export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})

export const reqCategorys = () => ajax(BASE + '/manage/category/list')

export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
    categoryName
})

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {
    categoryId,
    categoryName
})