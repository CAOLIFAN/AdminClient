import ajax from './ajax'

const BASE = ''

export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})

export const reqCategorys = () => ajax(BASE + '/manage/category/list')

export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
    categoryName
})

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update',
    {
        categoryId,
        categoryName
    }
)

export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', 
    {params: {
        pageNum, 
        pageSize
    }
})

export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search',
    {params: {
        pageNum,
        pageSize,
        [searchType]: searchName
    }
})

export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {
    method: 'POST',
    data: {
        productId,
        status
    }
}) 

export const reqRoles = () => ajax(BASE + '/manage/role/list')

export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {
    roleName
})

export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)