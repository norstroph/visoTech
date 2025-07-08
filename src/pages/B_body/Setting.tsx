import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useLogin} from "../../useEffect/Login.tsx";
import {useNavigate} from "react-router";


const Setting = () => {
    const {login} = useLogin();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to top, #000000, #ff0000)',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 5,
                    width: 300,
                }}
            >
                <Typography variant="h6" color="white" textAlign="center" mb={2}>
                    Connexion
                </Typography>
                <form>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        type="email"


                        required
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        type="password"


                        required
                        sx={{mb: 2}}
                    />
                    <Button variant="contained" color="error" onClick={async () => {
                        const success = await login(email, password);
                        if (success) {
                            navigate('/');
                        } else {
                            alert('Email ou mot de passe incorrect');
                        }

                    }}>
                        Se connecter
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Setting;
