//import { render } from "@testing-library/react";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import EarthquakesIndexPage from "main/pages/Earthquakes/EarthquakesIndexPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import { earthquakesFixtures } from "fixtures/earthquakesFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
//import { fireEvent, waitFor } from "@testing-library/react";

import mockConsole from "jest-mock-console";




const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("EarthquakesIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "EarthquakesTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three earthquakes without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakesFixtures.threeEarthquakes);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-_Id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-_Id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-_Id`)).toHaveTextContent("3");
    });

    test("renders three earthquakes without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakesFixtures.threeEarthquakes);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-_Id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-_Id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-_Id`)).toHaveTextContent("3");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });

        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/earthquakes/all");
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-_Id`)).not.toBeInTheDocument();
    });


    test("test what happens when you click purge, admin", async () => {

        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakesFixtures.threeEarthquakes);
        axiosMock.onPost("/api/earthquakes/purge").reply(200, "Earthquakes have been purged");

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`Earthquakes-Purge-Button`)).toBeInTheDocument(); });

        const deleteButton = getByTestId(`Earthquakes-Purge-Button`);
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        
        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
        expect(mockToast).toBeCalledWith("Earthquakes have been purged");

    });


    test("test purge button, not admin", async () => {

        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakesFixtures.threeEarthquakes);

        const { getByTestId, queryByText  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-_Id`)).toHaveTextContent("1"); });
        expect(queryByText (/Purge/)).not.toBeInTheDocument();
    });





/*
const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("EarthquakesIndexPage tests", () => {


    const axiosMock = new AxiosMockAdapter(axios);
    const testId = "EarthquakesTable";

    
        axiosMock.reset();
            axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
   

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };
    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three earthquakes without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakesFixtures.threeEarthquakes);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders three earthquakes without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").reply(200, earthquakeFixtures.threeEarthquakes);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });
    test("renders empty table when backend unavailable, useronly", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/all").timeout();
        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/earthquakes/all");
        restoreConsole();
        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });
});

*/
});