import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Alert } from '@mui/material';
import AtmIcon from '@mui/icons-material/Atm';
import useAuth from '../hooks/useAuth'; // Asegúrate de que la ruta sea correcta
import { useHistory } from 'react-router-dom';

const ResendTokenForm = () => {
    const { resendToken, error, successMessage } = useAuth();
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (successMessage === 'Código de verificación reenviado a tu correo electrónico.') {
            history.push('/verifytoken');
        }
    }, [successMessage, history]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await resendToken({ userId, email });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0 0 25px rgba(0, 123, 255, 0.6)',
                    bgcolor: 'background.paper',
                    border: '1px solid #ddd',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'glow 1.5s infinite alternate'
                }}
            >
                <Box
                    sx={{
                        width: 45,
                        height: 50,
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        bgcolor: '#2186EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <AtmIcon sx={{ color: 'white' }} />
                </Box>
                <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>
                    NextCryptoATM
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 4, fontFamily: 'Arial, sans-serif' }}>
                    Ingresa tu KEY de usuario y correo electrónico para reenviar el código de verificación
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="User ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            InputProps={{ sx: { borderRadius: 2, border: '1px solid #ddd' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{ sx: { borderRadius: 2, border: '1px solid #ddd' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            sx={{ borderRadius: 2 }}
                        >
                            Reenviar Código
                        </Button>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        </Grid>
                    )}
                    {successMessage && (
                        <Grid item xs={12}>
                            <Alert severity="success" sx={{ mt: 2 }}>
                                {successMessage}
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default ResendTokenForm;