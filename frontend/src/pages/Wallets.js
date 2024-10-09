import React, { useState } from 'react';
import useAllWallets from '../hooks/useAllWallets';
import {
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    Divider,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    useMediaQuery
} from '@mui/material';
import {
    getCoinList,
    getDefaultCoin,
    getCoinLogo,
    getDefaultNetworkId,
    getNetworkName
} from '../components/utils/Chains';
import { useHistory } from 'react-router-dom';
import MyWallets from '../components/MyWallets';

const Wallets = () => {
    const history = useHistory();
    const { walletBalance } = useAllWallets();
    const defaultCoin = getDefaultCoin();
    const [selectedCoin, setSelectedCoin] = useState(defaultCoin);
    
    // Media query for responsive design
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleCoinChange = (e) => setSelectedCoin(e.target.value);
    const handleCreateWallet = () => history.push(`/wallet/${selectedCoin}`);
    const handleBack = () => history.push('/');

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={12}>
                <Paper sx={{ p: 5, borderRadius: 2, boxShadow: 3, border: '2px solid #3f51b5', height: 'auto', minHeight: '700px', width: '100%' }}>
                    <Box textAlign="center" mb={3}>
                        <Typography variant="body2" color="text.secondary">
                            Balance Total
                        </Typography>
                        <Typography variant="h5" fontWeight={500}>
                            {'$'}{parseFloat(walletBalance).toFixed(2)}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <FormControl size="medium" sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
                            <InputLabel id="select-coin-label">Selecciona una moneda</InputLabel>
                            <Select
                                labelId="select-coin-label"
                                id="select-coin"
                                value={selectedCoin}
                                onChange={handleCoinChange}
                                label="Selecciona una moneda"
                                sx={{ borderRadius: 2 }}
                            >
                                {getCoinList().map((coin) => (
                                    <MenuItem key={coin} value={coin}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                width={24}
                                                src={getCoinLogo(coin)}
                                                alt={`${coin} logo`}
                                                style={{ marginRight: 8 }}
                                            />
                                            <span>{coin.toUpperCase()} • {getNetworkName(getDefaultNetworkId(coin))}</span>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="center" gap={isMobile ? 0 : 2} mb={2}>
                            <Button
                                onClick={handleCreateWallet}
                                color="primary"
                                variant="contained"
                                sx={{ width: isMobile ? '100%' : '200px', height: 60, borderRadius: 2, mb: isMobile ? 1 : 0 }}
                            >
                                RETIRAR DE ({selectedCoin.toUpperCase()})
                            </Button>
                            <Button
                                onClick={handleBack}
                                variant="outlined"
                                color="primary"
                                sx={{ width: isMobile ? '100%' : '150px', height: 60, borderRadius: 2 }}
                            >
                                REGRESAR
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Box>
                        <Typography variant="h6" fontWeight={600} color="primary" align="center" mb={2}>
                            Tus Billeteras
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: '300px' }}>
                            <MyWallets />
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Box m={3} />
        </Grid>
    );
};

export default Wallets;
