import { useQuery } from '@tanstack/react-query';
import { IranMap } from 'react-iran-map';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../service/handleToken';
import { useState } from 'react';

const mapData = {
    ardabil: 0,
    isfahan: 20,
    alborz: 11,
    ilam: 18,
    eastAzerbaijan: 10,
    westAzerbaijan: 20,
    bushehr: 15,
    tehran: 3,
    chaharmahalandBakhtiari: 25,
    southKhorasan: 29,
    razaviKhorasan: 11,
    northKhorasan: 19,
    khuzestan: 12,
    zanjan: 18,
    semnan: 9,
    sistanAndBaluchestan: 3,
    fars: 7,
    qazvin: 35,
    qom: 30,
    kurdistan: 24,
    kerman: 23,
    kohgiluyehAndBoyerAhmad: 2,
    kermanshah: 7,
    golestan: 18,
    gilan: 14,
    lorestan: 7,
    mazandaran: 28,
    markazi: 25,
    hormozgan: 14,
    hamadan: 19,
    yazd: 32,
}


function MapChart() {


    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['mapChart'],
        queryFn: async () => {
            const response = await api.get('/province-stats/',);
            return response.data;
        },

        refetchOnWindowFocus: false,
        retryDelay: 50,
    });



    // ۱. تعریف تابعی که قرار است هنگام کلیک اجرا شود
    const selectProvinceHandler = (province) => {
        const params = new URLSearchParams();
        params.set('province', province?.name);
        navigate({
            pathname: '/analysis',
            search: `?${params.toString()}`,
        });
    }




    if (isLoading) return <></>

    return (
        <div dir="rtl" className='' style={{
            margin: 'auto',

            width: '520px',

            padding: '',

        }}>
            <IranMap
                data={data ? data : mapData}
                colorRange='30, 70, 181'
                textColor='#000'
                width={460}
              
                deactiveProvinceColor='#eee'
                selectedProvinceColor='#3bcc6d'
                tooltipTitle='تعداد:'
                selectProvinceHandler={selectProvinceHandler}
                // پراپ اصلی برای دریافت کلیک

                // سایر تنظیمات مثل عرض نقشه، رنگ پیش‌فرض و ...

                seaBg="#a8dadc"
                colorSelectedProvince="#e63946"
            />
        </div>
    );
}

export default MapChart;