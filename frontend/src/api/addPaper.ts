import axios from "axios";
import { Paper } from "../types/Paper";

const apiUrl = process.env.REACT_APP_API_URL;

export async function addKCPEPaper(paper: Paper) {
    return await axios.post(`${apiUrl}/addkcpepaper`, paper);
  }

export async function uploadImage(data: any) {
    return await axios.post(`${apiUrl}/upload-image`, data)
  }
  