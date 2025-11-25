import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/handleToken';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';



const ChehreManager = () => {

    const queryClient = useQueryClient()
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [ostan, setOstan] = useState('');
    const [platform, setPlatform] = useState('');
    const [username, setUsername] = useState('');
    const [nameFa, setNameFa] = useState('');
    const [photo, setPhoto] = useState('');
    const [preview, setPreview] = useState(null);
    const [position, setPosition] = useState('');
    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetching provinces (markaz) from the API
    const { data: provincesData } = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await api.get('/provinces/');
            return res.data;
        },
    });

    const { data: platformsData } = useQuery({
        queryKey: ['platforms'],
        queryFn: async () => {
            const res = await api.get('/platforms/');
            return res.data;
        },
    });

    // Fetching existing channels
    const { data, isLoading: loading } = useQuery({
        queryKey: ['addProfile'],
        queryFn: async () => {
            const res = await api.get('/add-profile/');
            return res.data;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryDelay: 10,
    });

    // POST Mutation for creating a new channel
    const createChannel = useMutation({
        mutationFn: async (newProfile) => {
            const response = await api.post('/add-profile/', newProfile);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addProfile'] })
            // Close the form and reset state
            setOpen(false);
            setName('');
            setPlatform('');
            setUsername('');
            setNameFa('');
            setPosition('');
            setCategory('');
            setOstan('');
        },
    });

    const updateChannel = useMutation({
        mutationFn: async ({ profileId, updatedData }) => {
            const response = await api.put(`/add-profile/${profileId}/`, updatedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addProfile'] })
            // Close the form and reset state
            setOpen(false);
            setIsEditMode(false); // Reset edit mode flag
            setName('');
            setPlatform('');
            setUsername('');
            setNameFa('');
            setPosition('');
            setCategory('');
            setOstan('');
        },
    });

    const deleteChannel = useMutation({
        mutationFn: async (profileId) => {
            const response = await api.delete(`/add-profile/${profileId}/`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addProfile'] });
        },
    });

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('category', category);
        formData.append('province', ostan);
        formData.append('platform', platform);
        formData.append('name_fa', nameFa);
        formData.append('username', username);
        if (photo) formData.append('photo', photo);

        if (isEditMode) {

            updateChannel.mutate({ profileId: id, updatedData: formData });
        } else {
            // If not in edit mode, create a new channel
            createChannel.mutate(formData);
        }
    };

    const handleEdit = (profile) => {
        setIsEditMode(true);
        setName(profile.name);
        setUsername(profile.username);
        setNameFa(profile.name_fa);
        setPlatform(profile.platform);
        setId(profile.id);
        setPosition(profile.position)
        setCategory(profile.category)
        setOstan(profile.province);
        setOpen(true);
    };

    const handleDelete = (id) => {

        deleteChannel.mutate(id);

    };

    return (
        <>
            <div className="w-full h-99 no-scrollbar overflow-scroll font-YekanBakh_Regular">
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

                                            <div className="text-sm text-gray-600">موقعیت: {item.position ?? 'نامشخص'}</div>
                                            <div className="text-sm text-gray-600">دسته : {item.category ?? 'نامشخص'}</div>
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
                                <label className="block mb-1 text-gray-600">نام چهره</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">نام فارسی</label>
                                <input
                                    value={nameFa}
                                    onChange={(e) => setNameFa(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                />

                            </div>


                            <div>
                                <label className="block mb-1 text-gray-600">نام کاربری</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                />

                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">موقعیت</label>
                                <input
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">دسته</label>
                                <input
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                />

                            </div>

                            <div>
                                <label className="block mb-1 text-gray-600">پلتفرم</label>
                                <select
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    className="w-full border border-gray-400 rounded px-2 py-1"
                                >
                                    <option value="">انتخاب کنید</option>
                                    {platformsData?.map((plat) => (
                                        <option key={plat.id} value={plat.id}>
                                            {plat.name}
                                        </option>
                                    ))}
                                </select>
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

                            <div className='flex gap-x-3'>
                                <label className="block mb-1 text-gray-600">آپلود تصویر</label>

                                <div
                                    className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all rounded-lg p-4 text-center cursor-pointer"
                                    onClick={() => document.getElementById("photo-upload").click()}
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="پیش‌نمایش"
                                            className="w-32 h-32 object-cover rounded-md mx-auto"
                                        />
                                    ) : (
                                        <div className="text-gray-500 text-sm flex flex-col items-center justify-center space-y-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-8 w-8 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m-3-3V3"
                                                />
                                            </svg>
                                            <span>برای انتخاب عکس کلیک کنید</span>
                                        </div>
                                    )}
                                </div>

                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setPhoto(file);
                                            const reader = new FileReader();
                                            reader.onloadend = () => setPreview(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>


                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                className="!text-sm !font-YekanBakh_Bold"
                            >
                                {isEditMode ? "ویرایش چهره" : "ثبت چهره جدید"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChehreManager;
