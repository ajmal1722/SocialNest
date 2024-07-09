import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios_instaces/userInstance'

const useCheckAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await instance.get('/is-protected');
                // console.log('res:', response.data);
                if (response.data.isAuthenticated) {
                    navigate('/');
                }
            } catch (error) {
                console.log('Authentication check failed:', error);
            }
        };
        checkAuthStatus();
    }, [navigate]);
};

export default useCheckAuth;