import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const createEntry = newEntry => {
    const request = axios.post(baseUrl, newEntry);
    return request.then(response => response.data);
}

const deleteEntry = oldEntry => {
    const request = axios.delete(`${baseUrl}/${oldEntry.id}`);
    return request.then(response => response.data);
}

const updateEntry = (id, newEntry) => {
    const request = axios.put(`${baseUrl}/${id}`, newEntry);
    return request.then(response => response.data);
}

const exported = { getAll, createEntry, deleteEntry, updateEntry };
export default exported;