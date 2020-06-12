import qs from 'qs'
import ajax from './ajax'

const BASE = ''

export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})