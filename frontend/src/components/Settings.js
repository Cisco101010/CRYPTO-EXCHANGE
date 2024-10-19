import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import ChangePasswordComponent from './ChangePasswordComponent';
import TwoFactorAuthComponent from './TwoFactorAuthComponent';
import LanguageSelectorComponent from './LanguageSelectorComponent';
import UserProfileComponent from './UserProfileComponent'; 
import VerifyEmailComponent from './VerifyEmailComponent'; 
import { 
    Box, 
    Paper, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Typography, 
    Divider, 
    useTheme, 
    useMediaQuery 
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import SettingsIcon from '@mui/icons-material/Settings'; 
import { Link } from 'react-router-dom';

const sections = [
    { id: 'userProfile', label: 'Perfil', icon: <PersonIcon /> },
    { id: 'changePassword', label: 'Contraseña', icon: <LockIcon /> },
    { id: 'twoFactorAuth', label: 'Seguridad', icon: <SecurityIcon /> },
    { id: 'languageSelector', label: 'Idioma', icon: <LanguageIcon /> },
    { id: 'verifyEmail', label: 'Email', icon: <SecurityIcon /> },
];

const renderSection = (selectedSection) => {
    switch (selectedSection) {
        case 'userProfile': return <UserProfileComponent />;
        case 'changePassword': return <ChangePasswordComponent />;
        case 'twoFactorAuth': return <TwoFactorAuthComponent />;
        case 'languageSelector': return <LanguageSelectorComponent />;
        case 'verifyEmail': return <VerifyEmailComponent />;
        default: return null;
    }
};

function Settings() {
    const { t } = useTranslation(); 
    const [selectedSection, setSelectedSection] = useState('userProfile');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box 
            sx={{ 
                mt: 4, 
                display: 'flex', 
                minHeight: '80vh', 
                width: '100%', 
                mx: isMobile ? 0 : 'auto'
            }}
        >
            <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden', display: 'flex', width: '100%' }}>
                <Box sx={{ width: isMobile ? '17%' : '20%', bgcolor: theme.palette.grey[200] }}>
                    <List>
                        {sections.map(({ id, label, icon }) => (
                            <ListItem
                                button
                                key={id}
                                onClick={() => setSelectedSection(id)}
                                selected={selectedSection === id}
                                sx={{
                                    bgcolor: selectedSection === id ? theme.palette.primary.light : 'transparent',
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.main,
                                        color: '#FFFFFF',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ fontSize: isMobile ? 20 : 24 }}>{icon}</ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    sx={{
                                        display: isMobile ? 'none' : 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        typography: 'body2',
                                        fontSize: isMobile ? '0.875rem' : '1rem',
                                    }}
                                />
                            </ListItem>
                        ))}
                        <ListItem
                            button
                            component={Link}
                            to="/"
                            sx={{
                                marginTop: 'auto', 
                                '&:hover': {
                                    bgcolor: theme.palette.primary.main,
                                    color: '#FFFFFF',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ fontSize: isMobile ? 20 : 24 }}><ArrowBackIcon /></ListItemIcon>
                            <ListItemText
                                primary={t('back_button')} 
                                sx={{
                                    display: isMobile ? 'none' : 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    typography: 'body2',
                                    fontSize: isMobile ? '0.875rem' : '1rem',
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SettingsIcon sx={{ fontSize: isMobile ? 30 : 40, mr: 1, mb: 0.5 }} />
                        <Typography 
                            variant={isMobile ? 'h5' : 'h4'} 
                            component="h1" 
                            gutterBottom 
                            sx={{ lineHeight: '40px', fontSize: isMobile ? '1.5rem' : '2rem' }} 
                        >
                            {t('settings_title')} 
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {renderSection(selectedSection)}
                </Box>
            </Paper>
        </Box>
    );
}

export default Settings;
