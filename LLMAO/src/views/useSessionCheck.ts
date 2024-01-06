import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useToast} from '@chakra-ui/react';
export const useSessionCheck = (): void => {
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const sessionValue = sessionStorage.getItem('authenticated');
        if (!sessionValue) {
            toast({
                title: 'Login Required!.',
                description: 'You are not Logged in.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        }
    }, [navigate]);
};
