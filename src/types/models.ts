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

interface user {
    username: string,
    name: string,
    phone_num: string,
    email: string,
    unhashed_pass: string,
    access_level: string,
}

interface fieldWithRatingsAndDistance {
    field_id: number,
    ratings: number,
    distance: number
}

interface history {
    history_id: number,
    booking_id: number,
    field_id: number,
    field_name: string,
    start_time: any,
    booking_date: any,
    total_price: number,
    duration_minute: number
}

interface booking {
    booking_id: number,
    duration_minute: number,
    start_time: any,
    date: any,
    total_price: number,
    field_id: number,
    user_id: number
}

interface fieldIncome {
    field_id: number,
    field_name: string,
    field_income: number
}

export type { field, fieldWithRatingsAndDistance, history, booking, fieldIncome, user }