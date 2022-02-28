import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
// import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/EarthquakeUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function EarthquakesTable({ subjects, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/earthquakes/edit/${cell.row.values._Id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/earthquakes/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }


    const columns = [
        {
            Header: 'Id',
            accessor: '_Id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: row => <a href={row.properties.url}> {row.properties.title}</a>,
            id: 'title'
        },
        {
            Header: 'Mag',
            accessor: row => row.properties.mag,
            id: 'mag'
        },
        {
            Header: 'Place',
            accessor: row => row.properties.place,
            id: 'place'
        },
        {
            Header: 'Time',
            accessor: row => row.properties.time,
            id: 'time'
        }
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "EarthquakesTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "EarthquakesTable"));
    } 

    // Stryker disable next-line ArrayDeclaration : [columns] is a performance optimization
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedDates = React.useMemo(() => subjects, [subjects]);

    return <OurTable
        data={memoizedDates}
        columns={memoizedColumns}
        testid={"EarthquakesTable"}
    />;
};