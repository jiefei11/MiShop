import { Service } from "@/utils/Service";
export function getBanner() {
    return Service ({
        url: '/settings/getBanner',
        method: 'get',
    })
}

export function uptBanner(data) {
    return Service ({
        url: '/settings/uptBanner',
        params: {
            images: data
        }
    })
}