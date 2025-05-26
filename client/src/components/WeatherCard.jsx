import React from "react";
import { useSelector } from "react-redux";

const WeatherCard = () => {
    const { current } = useSelector((state) => state.weather);

    return (
        <div className="bg-[#FAE2BD] text-[#EFAA82] p-6 rounded-[2rem] text-center shadow-md">
            <div className="text-[20px] font-medium">Today</div>
            <div className="text-[80px] font-medium flex justify-center items-center">
                <img src={`https://openweathermap.org/img/wn/${current?.icon}@2x.png`} alt="icon" className="w-20 h-20" />
                {current?.temperature?.toString().slice(0, 2)}
                <span className="text-[40px] font-semibold align-top relative -top-4 ml-1">°</span>
            </div>

            <div className="text-[18px] font-medium">{current?.description}</div>
            <div className="mt-3 font-medium text-[12px]">{current?.city}</div>
            <div className="mt-3 font-medium text-[12px]">{current?.date?.slice(0, 10)}</div>
            <div className="mt-3 font-medium text-[12px]">Feels Like 30 | Sunset 18:20</div>
        </div>
    );
};

export default WeatherCard;
