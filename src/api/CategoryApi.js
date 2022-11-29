import {Service} from '../utils/Service'

//获取分类
export function getCategory() {
    return Service({
        url: '/category',
        method: 'get'
    })
}

//修改分类
export function editCategory(data) {
    return Service({
        url: '/category/edit',
        params: {
            id: data.id,
            cateName: data.cateName
        }
    })
}

export function addCateCover(id,data) {
	return Service({
		url: '/category/cover',
		params: {
			id: id,
			data: data
		}
	})
}