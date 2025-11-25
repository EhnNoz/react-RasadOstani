import { Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../service/handleToken";
import { useSearchParams } from "react-router-dom";
import ChannelTable from "./ChannelTable";
import Buttons from "./Buttons";
import EstelamPage from "./EstelamPage";

function MojavezManager() {
    const [channelName, setChannelName] = useState("");
    const [channelId, setChannelId] = useState("");
    const [platform, setPlatform] = useState("");
    const [center, setCenter] = useState("");
    const [assignedNum, setAssignedNum] = useState("");
    const [subject, setSubject] = useState("");
    const [subSubject, setSubSubject] = useState("");
    const [audience, setAudience] = useState("");
    const [creatorPhone, setCreatorPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [searchParams] = useSearchParams({});
    const [open, setOpen] = useState(false); // فرم ثبت
    const [openestelam, setOpenEstelam] = useState(false); // صفحه استعلام
    const [editingId, setEditingId] = useState(null);
    const queryClient = useQueryClient();

    // فچ داده‌ها (بدون تغییر)
    const { data } = useQuery({
        queryKey: ["channelSuggestions", searchParams.toString()],
        queryFn: async () => {
            const response = await api.get("/sapi/sup/channel-suggestions/", {
                params: Object.fromEntries(searchParams),
            });
            return response.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (newChannel) => {
            const res = await api.post("/sapi/sup/channel-suggestions/", newChannel);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["channelSuggestions"]);
        },
    });

    const { data: platforms } = useQuery({ queryKey: ["platforms"], queryFn: async () => (await api.get("/sapi/sup/platforms/")).data });
    const { data: centers } = useQuery({ queryKey: ["centers"], queryFn: async () => (await api.get("/sapi/sup/centers/")).data });
    const { data: subjects } = useQuery({ queryKey: ["subjects"], queryFn: async () => (await api.get("/sapi/sup/subjects/")).data });
    const { data: allSubSubjects } = useQuery({ queryKey: ["subSubjects"], queryFn: async () => (await api.get("/sapi/sup/subsubjects/")).data });
    const { data: audiences } = useQuery({ queryKey: ["audiences"], queryFn: async () => (await api.get("/sapi/sup/audiences/")).data });

    const resetState = () => {
        setChannelName("");
        setChannelId("");
        setPlatform("");
        setCenter("");
        setAssignedNum("");
        setSubject("");
        setSubSubject("");
        setAudience("");
        setCreatorPhone("");
        setNotes("");
        setEditingId(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            channel_name: channelName,
            channel_id: channelId,
            creator_phone: creatorPhone,
            assigned_sim_number: assignedNum,
            suggested_platforms_ids: platform ? [Number(platform)] : [],
            notes,
            center: center ? Number(center) : null,
            subject: subject ? Number(subject) : null,
            sub_subject: subSubject ? Number(subSubject) : null,
            audience: audience ? Number(audience) : null,
            creator: 1,
        };

        if (editingId) {
            api
                .patch(`/sapi/sup/channel-suggestions/${editingId}/`, payload)
                .then(() => {
                    queryClient.invalidateQueries(["channelSuggestions"]);
                    setOpen(false);
                    resetState();
                })
                .catch(error => {
                    console.error("Update Error:", error);
                    alert("خطا در ویرایش اطلاعات.");
                });
        } else {
            mutation.mutate(payload, { 
                onSuccess: () => {
                    setOpen(false);
                    resetState();
                },
                onError: (error) => {
                    console.error("Creation Error:", error);
                    alert("خطا در ثبت کانال جدید.");
                }
            });
        }
    };

    const startEditing = (row) => {
        setEditingId(row.id);
        setChannelName(row.channel_name || "");
        setChannelId(row.channel_id || "");
        setPlatform(row.suggested_platforms?.[0]?.id || ""); 
        setCenter(row.center || "");
        setSubject(row.subject || "");
        setSubSubject(row.sub_subject || "");
        setAudience(row.audience || "");
        setCreatorPhone(row.creator_phone || "");
        setNotes(row.notes || "");
        setAssignedNum(row.assigned_sim_number || "");
        setOpen(true);
        setOpenEstelam(false);
    };

    const handleCloseForm = () => {
        setOpen(false);
        setOpenEstelam(false);
        resetState();
    };

    return (
        // نکته: کلاس‌های محدودکننده ارتفاع و اسکرول (مثل h-96 یا max-h-...) از اینجا حذف شده‌اند.
        // حالا این کانتینر به اندازه محتوای خود رشد می‌کند.
        <div className="w-full p-2 overflow-scroll no-scrollbar lg:h-100 md:h-80 md:p-4 font-YekanBakh_Regular">
            {/* حالت 1: لیست کانال‌ها */}
            {!open && !openestelam && (
                <>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-x-4 mb-4">
                        <Button
                            variant="outlined"
                            className="!text-sm h-10 !font-YekanBakh_Bold !w-full md:!w-auto"
                            onClick={() => { setOpen(true); resetState(); }} 
                        >
                            + ثبت مجوز جدید
                        </Button>
                        <Button
                            variant="outlined"
                            className="!text-sm h-10 !font-YekanBakh_Bold !w-full md:!w-auto"
                            onClick={() => setOpenEstelam(true)}
                        >
                            + استعلام
                        </Button>
                    </div>
                    {/* اگر جدول بسیار طولانی است، اسکرول باید در ChannelTable اعمال شود. */}
                    <ChannelTable data={data} onEdit={startEditing} />
                </>
            )}
            
            {/* حالت 2: صفحه استعلام */}
            {openestelam && !open && (
                <div className="flex flex-col gap-4">
                    <Button
                        variant="outlined"
                        className="!text-sm h-10 !font-YekanBakh_Bold !w-32 self-start"
                        onClick={handleCloseForm}
                    >
                        {"< بازگشت"}
                    </Button>
                    <EstelamPage />
                </div>
            )}
            
            {/* حالت 3: فرم ثبت/ویرایش */}
            {open && (
                <div className="flex overflow-scroll lg:h-100 no-scrollbar h-80 flex-col gap-4">
                    <Button
                        variant="outlined"
                        className="!text-sm h-10 !font-YekanBakh_Bold !w-32 self-start"
                        onClick={handleCloseForm}
                    >
                        {"< بازگشت"}
                    </Button>
                    <form
                        onSubmit={handleSubmit}
                        // max-w-4xl و mx-auto باعث می شود فرم در وسط صفحه نمایش داده شود
                        className="rounded-md p-4 md:p-6 max-w-4xl mx-auto bg-white shadow-lg w-full"
                    >
                        <h2 className="text-lg md:text-xl font-YekanBakh_Bold mb-6 text-center text-gray-800">
                            {editingId ? "ویرایش اطلاعات کانال" : "ثبت کانال پیشنهادی جدید"}
                        </h2>
                        
                        {/* ریسپانسیو فرم: تک ستونی در موبایل و دو ستونی در دسکتاپ */}
                        <div className="grid grid-cols-1   md:grid-cols-2 gap-4 mb-6 text-[13px]">
                            {/* تمام فیلدهای ورودی... */}
                            <div>
                                <label className="block mb-1 text-gray-600">نام کانال</label>
                                <input value={channelName} onChange={(e) => setChannelName(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" type="text" placeholder="مثال: کانال خبری" />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">آیدی کانال</label>
                                <input value={channelId} onChange={(e) => setChannelId(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" type="text" placeholder="مثال: @news_channel" />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">انتخاب پلتفرم</label>
                                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white">
                                    <option value="">انتخاب کنید</option>
                                    {platforms?.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">انتخاب ستاد</label>
                                <select value={center} onChange={(e) => setCenter(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white">
                                    <option value="">انتخاب کنید</option>
                                    {centers?.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">انتخاب موضوع</label>
                                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white">
                                    <option value="">انتخاب کنید</option>
                                    {subjects?.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">انتخاب زیرموضوع</label>
                                <select value={subSubject} onChange={(e) => setSubSubject(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white">
                                    <option value="">انتخاب کنید</option>
                                    {allSubSubjects?.filter(ss => !subject || ss.parent_subject === Number(subject)).map((ss) => (<option key={ss.id} value={ss.id}>{ss.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">انتخاب مخاطب</label>
                                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white">
                                    <option value="">انتخاب کنید</option>
                                    {audiences?.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">شماره تماس (سازنده)</label>
                                <input value={creatorPhone} onChange={(e) => setCreatorPhone(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" type="text" placeholder="مثال: 0912xxxxxxx" />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">شماره سیمکارت تخصیص‌یافته</label>
                                <input value={assignedNum} onChange={(e) => setAssignedNum(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" type="text" placeholder="اختیاری" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 text-gray-600">توضیحات</label>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-gray-400 rounded px-2 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" rows={4} placeholder="توضیحات بیشتر در مورد کانال یا درخواست مجوز..." />
                        </div>

                        <div className="flex justify-center">
                            {/* دکمه اصلی فرم */}
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={mutation.isLoading}
                                className="!text-sm h-10 !font-YekanBakh_Bold !bg-cyan-600 hover:!bg-cyan-700 !text-white !w-full md:!w-64"
                            >
                                {editingId
                                    ? "ذخیره و ویرایش کانال"
                                    : mutation.isLoading
                                        ? "در حال ثبت..."
                                        : "ثبت کانال جدید"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MojavezManager;