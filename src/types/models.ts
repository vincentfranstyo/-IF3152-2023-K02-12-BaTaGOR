interface field {
    field_id: number,
    field_name: string,
    street: string,
    city: string,
    province: string,
    postal_code: number,
    image_url: string
    rate_per_hour: number,
    operational_status: string,
    owner_id: number
}

interface fieldWithRatings {
    field_id: number,
    field_name: string,
    street: string,
    city: string,
    province: string,
    postal_code: number,
    image_url: string
    rate_per_hour: number,
    operational_status: string,
    owner_id: number,
    ratings: number
}

export type { field, fieldWithRatings }