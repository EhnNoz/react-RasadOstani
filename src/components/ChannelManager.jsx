import React, { useState } from 'react';
import { Button, FormControl, Grid, IconButton, MenuItem, Select } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/handleToken';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
function ChannelListSettings() {
    const queryClient = useQueryClient()
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [platform, setPlatform] = useState('');
    const [ostan, setOstan] = useState('');
    const [idchannel, setIdChannel] = useState();
    const [dasteUser, setDasteUser] = useState('');
    const [dasteSiasi, setDasteSiasi] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false); // Flag for edit mode

    // Fetching platforms from the API
    const { data: platformsData } = useQuery({
        queryKey: ['platforms'],
        queryFn: async () => {
            const res = await api.get('/platforms/');
            return res.data;
        },
    });

    // Fetching provinces (markaz) from the API
    const { data: provincesData } = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await api.get('/provinces/');
            return res.data;
        },
    });

    // Fetching political categories
    const { data: politicalCategories } = useQuery({
        queryKey: ['political-categories'],
        queryFn: async () => {
            const res = await api.get('/political-categories/');
            return res.data;
        },
    });

    // Fetching user categories
    const { data: userCategories } = useQuery({
        queryKey: ['user-categories'],
        queryFn: async () => {
            const res = await api.get('/user-categories/');
            return res.data;
        },
    });

    // Fetching existing channels
    const { data, isLoading: loading } = useQuery({
        queryKey: ['addChannel'],
        queryFn: async () => {
            const res = await api.get('/add-channels/');
            return res.data;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryDelay: 10,
    });

    // POST Mutation for creating a new channel
    const createChannel = useMutation({
        mutationFn: async (newChannelData) => {
            const response = await api.post('/add-channels/', newChannelData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addChannel'] })
            // Close the form and reset state
            setOpen(false);
            setName('');
            setId('');
            setPlatform('');
            setOstan('');
            setDasteSiasi('');
            setDasteUser('');

        },
    });

    // PUT Mutation for updating an existing channel
    const updateChannel = useMutation({
        mutationFn: async ({ channelId, updatedData }) => {
            const response = await api.put(`/add-channels/${channelId}/`, updatedData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addChannel'] })
            // Close the form and reset state
            setOpen(false);
            setIsEditMode(false); // Reset edit mode flag
            setName('');
            setId('');
            setPlatform('');
            setOstan('');
            setDasteSiasi('');
            setDasteUser('');
            setSelectedUsers([]);
        },
    });
    const deleteChannel = useMutation({
        mutationFn: async (channelId) => {
            const response = await api.delete(`/add-channels/${channelId}/`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addChannel'] });
        },
    });
    const handleSubmit = () => {
        const channelData = {
            name_fa: name,
            platform,
            username: id,
            province: ostan,
            political_category: dasteSiasi,
            user_category: dasteUser,

        };

        if (isEditMode) {
            // If in edit mode, update the channel
            updateChannel.mutate({ channelId: idchannel, updatedData: channelData });
        } else {
            // If not in edit mode, create a new channel
            createChannel.mutate(channelData);
        }
    };

    const handleEdit = (channel) => {
        setIsEditMode(true);
        setIdChannel(channel.id);
        setName(channel.name_fa);
        setId(channel.username);
        setDasteUser(channel.user_category);
        setDasteSiasi(channel.political_category);
        setPlatform(channel.platform);
        setOstan(channel.province);

        setOpen(true);
    };

    const handleDelete = (channel) => {

        deleteChannel.mutate(channel.id);

    };
    return (
        <Grid size={12} className="w-full font-YekanBakh_Regular">
            {!open && (
                <div className="mb-4">
                    <Button
                        variant="outlined"
                        className="!text-sm !font-YekanBakh_Bold"
                        onClick={() => setOpen(true)}
                    >
                        + ثبت کانال جدید
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
                                            <div className="font-bold text-[15px]">{`${item.name_fa} (${item.username})`}</div>
                                            <div>
                                                <IconButton size="small" onClick={() => handleEdit(item)}>
                                                    <EditIcon sx={{ fontSize: 20 }} />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => handleDelete(item)}>
                                                    <ClearIcon sx={{ fontSize: 20 }} />
                                                </IconButton>
                                            </div>

                                        </div>

                                        <div className="text-sm text-gray-600">دسته سیاسی: {item.political_category ?? 'نامشخص'}</div>
                                        <div className="text-sm text-gray-600">دسته کاربری: {item.user_category ?? 'نامشخص'}</div>
                                        <div className="text-sm text-gray-600">پلتفرم: {item.platform ?? 'نامشخص'}</div>
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
                            <label className="block mb-1 text-gray-600">نام کانال</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-400 rounded px-2 py-1"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600">یوزنیم کانال</label>
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full border border-gray-400 rounded px-2 py-1"
                                type="text"
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
                                {platformsData?.map((platform) => (
                                    <option key={platform.id} value={platform.id}>
                                        {platform.name}
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

                        <div>
                            <label className="block mb-1 text-gray-600">دسته کاربری</label>
                            <select
                                value={dasteUser}
                                onChange={(e) => setDasteUser(e.target.value)}
                                className="w-full border border-gray-400 rounded px-2 py-1"
                            >
                                <option value="">انتخاب کنید</option>
                                {userCategories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600">دسته سیاسی</label>
                            <select
                                value={dasteSiasi}
                                onChange={(e) => setDasteSiasi(e.target.value)}
                                className="w-full border border-gray-400 rounded px-2 py-1"
                            >
                                <option value="">انتخاب کنید</option>
                                {politicalCategories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
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
                            {isEditMode ? "ویرایش کانال" : "ثبت کانال جدید"}
                        </Button>
                    </div>
                </div>
            )}
        </Grid>
    );
}

export default ChannelListSettings;
