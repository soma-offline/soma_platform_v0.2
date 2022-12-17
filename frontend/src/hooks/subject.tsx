import { useQuery } from 'react-query';
const apiUrl = process.env.REACT_APP_API_URL;

export function useGetSubjects(){
    return useQuery(['getSubjects'], async () => {
        const res = await fetch(`${apiUrl}/subjects`);
        return res.json();
    })
}