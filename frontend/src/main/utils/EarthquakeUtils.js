import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/earthquakes",
        method: "DELETE",
        params: {
            _Id: cell.row.values._Id
        }
    }
}

