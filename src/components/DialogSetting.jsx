import { Dialog, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import  { useState } from 'react';
import ChehreManager from './ChehreManager';
import ProfileManager from './ProfileManager';
import ChannelManager from './ChannelManager';
import ProgramManager from './ProgramManager';
import AboutMe from './AboutMe';

function DialogSetting({ open, setOpen }) {
  const [activeTab, setActiveTab] = useState('پروفایل کاربری');
  const tabs = ['پروفایل کاربری', 'کانال', 'چهره', 'برنامه', 'درباره ما'];

  return (
    <Dialog
      PaperProps={{
        sx: {
          direction: 'rtl',
          width: {
            xs: '95%',
            sm: '90%',
            md: '80%',
            lg: '70%',
          },
          maxWidth: '100%',
          mx: 'auto',
          my: 4,
          borderRadius: 2,
        },
      }}
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Grid container direction="column" className="bg-white rounded-md overflow-hidden">

        {/* Header */}
        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} className="relative border-b border-gray-200 bg-gray-100 py-3 flex justify-center items-center">
          <span className="text-cyan-700 font-YekanBakh_Bold text-[16px]">تنظیمات</span>
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            className="!absolute top-2 left-2"
          >
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Grid>

        {/* Body */}
        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }} className="h-[410px]" spacing={2}>

          {/* Sidebar */}
          <Grid
            item
            size={{ xs: 12, sm: 12, md: 3, lg: 2 }}
            className="border-l md:border-l-0 border-gray-200 p-3 bg-white"
          >
            <Grid
              container
              direction={{ xs: 'row', sm: 'row', md: 'column', lg: 'column' }}
              spacing={1}
              className="text-[13px] font-YekanBakh_Regular"
              justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' }}
            >
              {tabs.map((item) => (
                <Grid
                  item
                  key={item}
                  size={{ xs: true, sm: true, md: true, lg: true }}
                  className={`cursor-pointer py-1 px-2 rounded-md text-center ${activeTab === item
                    ? 'bg-gray-300 text-black font-bold'
                    : 'hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Content */}
          <Grid
            item
            size={{ xs: 12, sm: 12, md: 9, lg: 10 }}
            className="p-4"
          >
            {activeTab === 'کانال' && (
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <ChannelManager />
              </Grid>
            )}
            {activeTab === 'چهره' && (
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <ChehreManager />
              </Grid>
            )}
            {activeTab === 'برنامه' && (
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <ProgramManager />
              </Grid>
            )}
            {activeTab === 'درباره ما' && (
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <AboutMe />
              </Grid>
            )}
            {activeTab === 'پروفایل کاربری' && (
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <ProfileManager />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default DialogSetting;
