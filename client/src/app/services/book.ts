import axios from "@/lib/axios";


export const getBooks = async () => {
    const response = await axios.get("/books");
    console.log(response.data);
    return response.data;
}

