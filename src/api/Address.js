import { Service } from "@/utils/Service";

export function getCity(){
    return Service({
        url: '/address/citys',
        method: 'get'
    })
}

export function addAddress(data){
    return Service({
        url: '/address/add',
        data
    })
}

export function getAddress(){
    return Service({
        url: '/address',
        method: 'get'
    })
}

export function delAddress(id) {
    return Service({
        url: '/address/del',
        params: {
            id: id
        }
    })
}