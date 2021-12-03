import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const placesData = createApi({
    reducerPath: 'placesData',
    baseQuery: fetchBaseQuery({baseUrl: 'https://travel-advisor.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getPlacesData: builder.query({
            query: (type, sw, ne) => ({
                url: `/${type}/list-in-boundary`,
                params: {
                    bl_latitude: sw?.lat ?? '23.63936',
                    tr_latitude: ne?.lat ?? '28.20453',
                    bl_longitude: sw?.lng ?? '68.14712',
                    tr_longitude: ne?.lng ?? '97.34466',
                },
                headers: {
                  'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                  'x-rapidapi-key': 'e036bc8cb6msh4a25ec88814030ap1a4671jsnd8e1cce66170'
                }
            })
        }),
    }),
})

export const { useGetPlacesDataQuery } = placesData