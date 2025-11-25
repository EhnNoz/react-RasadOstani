
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../service/handleToken";

const EmblaCarousel = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  // ✅ تنظیم دقیق Embla برای RTL
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: "rtl", // 👈 مهم برای جهت راست به چپ
    dragFree: false,
  });


  const { data = [], isLoading, isError } = useQuery({
    queryKey: [searchParams.toString(),"profiles"],
    queryFn: async () => {
      const finalParams = Object.fromEntries(searchParams.entries());
      const response = await api.get("/profiles/", { params: finalParams });
      return response.data;
    },
    retry: false,
  });


  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (isError) return <p className="text-center text-red-500">خطا در بارگذاری اطلاعات</p>;

  return (
    <div className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="card">
                <div className="flex justify-center">
                  <img src={slide.photo} alt={slide.name} className="avatar" />
                </div>
                <h3>{slide.name}</h3>
                <p>{slide.position}</p>
                <p>{slide.category}</p>
                <div className="buttons p-2 gap-x-3">
                  <button
                    onClick={() =>
                      navigate("/chehreostani/chehreDetails", {
                        state: { name: slide.name },
                      })
                    }
                    className="btn-view w-20"
                  >
                    مشاهده
                  </button>
                  <button className="btn-stats w-20">آمار</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 کنترل‌های راست و چپ */}


      {/* === استایل === */}
      <style jsx>{`
        .embla {
          position: relative;
          max-width: 100%;
          margin: 0 auto;
          direction: rtl;
        }

        .embla__viewport {
          overflow: hidden;
          width: 100%;
        }

        .embla__container {
          display: flex;
          touch-action: pan-y;
          user-select: none;
          direction: rtl;
        }

        /* ✅ هر بار ۵ تا آیتم */
      .embla__slide {
        flex: 0 0 auto; /* 👈 اجازه دهید عرض کارت خودش تعیین کند */
        padding: 10px;
        box-sizing: border-box;
        max-width: 250px; /* 👈 حداکثر عرض برای کارت‌ها */
        min-width: 200px; /* 👈 حداقل عرض برای ظاهر خوب */
      }
      
      @media (max-width: 1200px) {
        .embla__slide {
          max-width: 220px;
          min-width: 180px;
        }
      }
      
      @media (max-width: 900px) {
        .embla__slide {
          max-width: 200px;
          min-width: 160px;
        }
      }
      
      @media (max-width: 600px) {
        .embla__slide {
          max-width: 180px;
          min-width: 140px;
        }
      }

        .card {
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 12px;
          text-align: center;
          transition: all 0.3s ease;
           width: 100%; /* 👈 کارت همیشه عرض والدش را پر کند */
          max-width: 100%; /* 👈 برای جلوگیری از بیرون زدن */
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }

        h3 {
          margin: 5px 0;
          font-size: 16px;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }

        .btn-view,
        .btn-stats {
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 13px;
        }

        .btn-view {
          background-color: #ff6b6b;
          color: #fff;
        }

        .btn-stats {
          background-color: #ebe2f4;
          color: #fff;
        }

        .embla__buttons {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          gap: 12px;
        }

        .embla__button {
          background: #4f77ff;
          border: none;
          color: #fff;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .embla__button:hover {
          background: #3656d3;
        }
      `}</style>
    </div>
  );
};

export default EmblaCarousel;
