
import useNum from "../customhooks/useNum";


const Stats = ({ data }) => {


  return (
    <>
      <div  className="flex flex-col md:flex-row bg-[#F9F9FB] items-center justify-around gap-6  p-6 rounded-2xl ">
        <div

          className="flex flex-col items-center justify-center w-40 text-center"
        >
          <h2 dir="rtl" className=" font-extrabold text-[#6E39CB]  text-[40px]">
            {useNum(data?.total_posts)}  پست
          </h2>
           <div className="text-[13px] text-[#8E8E93] mt-1">
            {useNum(data?.post_percentage)}%
          </div>
          <p className=" text-gray-500 text-[13px] text-[#8E8E93] mt-1">کل پست</p>
        </div>
        <div

          className="flex flex-col items-center justify-center w-40 text-center"
        >
          <h2 dir="rtl" className="text-[#6E39CB]  text-[40px] font-extrabold ">
            {useNum(data?.total_likes)}  لایک
          </h2>
           <div className="text-[13px] text-[#8E8E93] mt-1">
            {useNum(data?.like_percentage)}%
          </div>
          <p className="text-[13px] text-[#8E8E93] mt-1">کل لایک</p>
        </div>
        <div

          className="flex flex-col items-center justify-center w-40 text-center"
        >
          <h2 className="text-[#6E39CB]  text-[40px] font-extrabold ">
            {useNum(data?.total_views)} بازدید
          </h2>
          <div className="text-[13px] text-[#8E8E93] mt-1">
            {useNum(data?.view_percentage)}%
          </div>
          <p className="text-[13px] text-[#8E8E93] mt-1">کل بازدید</p>
        </div>
      </div>
    </>

  );
};

export default Stats;
