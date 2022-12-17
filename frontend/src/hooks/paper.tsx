import { useQuery } from 'react-query';
const apiUrl = process.env.REACT_APP_API_URL;

export function useGetPapers(subject:string){
    return useQuery(['getPapers', subject], async () => {
        const res = await fetch(`${apiUrl}/subjects/${subject}`);
        return res.json();
    })
}

export function useGetPaper(title_year:string){
    return useQuery(['getPaper', title_year], async () => {
        const res = await fetch(`${apiUrl}/paper/${title_year}`);
        return res.json();
    })
}