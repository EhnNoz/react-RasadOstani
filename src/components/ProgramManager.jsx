import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/handleToken';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';



function ProgramManager() {

    const queryClient = useQueryClient()
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [ostan, setOstan] = useState('');
    const [desc, setDesc] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, isLoading: loading } = useQuery({
        queryKey: ['addTvprogram'],
        queryFn: async () => {
            const res = await api.get('/add-tvprogram/');
            return res.data;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryDelay: 10,
    });



    // Fetching provinces (markaz) from the API
    const { data: provincesData } = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await api.get('/provinces/');
            return res.data;
        },
    });


    const createChannel = useMutation({
        mutationFn: async (newProfile) => {
            const response = await api.post('/add-tvprogram/', newProfile);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addTvprogram'] })
            // Close the form and reset state
            setOpen(false);
            setName('');
            setPosition('');
            setCategory('');
            setOstan('');
        },
    });

    const updateChannel = useMutation({
        mutationFn: async ({ profileId, updatedData }) => {
            const response = await api.put(`/add-tvprogram/${profileId}/`, updatedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addTvprogram'] })
            // Close the form and reset state
            setOpen(false);
            setIsEditMode(false); // Reset edit mode flag
            setName('');
            setPosition('');
            setCategory('');
            setOstan('');
        },
    });
    const deleteChannel = useMutation({
        mutationFn: async (profileId) => {
            const response = await api.delete(`/add-tvprogram/${profileId}/`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addTvprogram'] });
        },
    });
    const handleSubmit = () => {
        const data = {
            name ,
            tv_program_query : desc , 
            province : ostan
        }



        if (isEditMode) {

            updateChannel.mutate({ profileId: id, updatedData: data });
        } else {
            // If not in edit mode, create a new channel
            createChannel.mutate(data);
        }
    };

    const handleEdit = (profile) => {
        setIsEditMode(true);
        setName(profile.name);
        setId(profile.id);
        setDesc(profile.tv_program_query)
        setOstan(profile.province);
        setOpen(true);
    };

    const handleDelete = (id) => {

        deleteChannel.mutate(id);

    };


    return (
        <div>
            <div className="w-full font-YekanBakh_Regular">
                {!open && (
                    <div className="mb-4">
                        <Button
                            variant="outlined"
                            className="!text-sm !font-YekanBakh_Bold"
                            onClick={() => setOpen(true)}
                        >
                            + ثبت چهره جدید
                        </Button>

                        {loading ? (
                            <div className="mt-4 text-center">در حال بارگذاری...</div>
                        ) : (
                            <div className="mt-4 overflow-y-auto no-scrollbar max-h-[320px] space-y-4">
                                {data?.length === 0 ? (
                                    <div className="text-center text-gray-500">کانالی ثبت نشده است</div>
                                ) : (
                                    data?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-gray-300 rounded-md p-3"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-[15px]">{`${item.name} `}</div>
                                                <div>
                                                    <IconButton size="small" onClick={() => handleEdit(item)}>
                                                        <EditIcon sx={{ fontSize: 20 }} />
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                        <ClearIcon sx={{ fontSize: 20 }} />
                                                    </IconButton>
                                                </div>

                                            </div>

                                            <div className="text-sm text-gray-600">توضیحات کانال : {item.tv_program_query ?? 'نامشخص'}</div>
                                            <div className="text-sm text-gray-600">استان: {item.province ?? 'نامشخص'}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}

                {open && (
                    <div className="rounded-md p-6 overflow-scroll no-scrollbar max-w-xl mx-auto">
                        <div className="grid grid-cols-2 gap-4 mb-6 text-[13px]">
                            <div>
                                <label className="block mb-1 text-gray-600">نام برنامه</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">توضیحات کانال</label>
                                <input
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                />

                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">استان</label>
                                <select
                                    value={ostan}
                                    onChange={(e) => setOstan(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                >
                                    <option value="">انتخاب کنید</option>
                                    {provincesData?.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name_fa}
                                        </option>
                                    ))}
                                </select>
                            </div>




                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                className="!text-sm !font-YekanBakh_Bold"
                            >
                                {isEditMode ? "ویرایش برنامه" : "ثبت برنامه جدید"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProgramManager
