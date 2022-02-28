import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakesCreatePage from "main/pages/Earthquakes/EarthquakesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { earthquakesFixtures } from "fixtures/earthquakesFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("EarthquakesCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders oneEarthquake for regular user without crashing", () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/retrieve").reply(200, earthquakesFixtures.oneEarthquake);

        const {getByTestId} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const earthquake = {
            distance: 12,
            minMag: 0.9,
            length: 1
        };

        axiosMock.onPost("/api/earthquakes/retrieve").reply(202, earthquake);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("EarthquakeForm-distance")).toBeInTheDocument();
        });

        const distanceField = getByTestId("EarthquakeForm-distance");
        const magnitudeField = getByTestId("EarthquakeForm-mag");
        const submitButton = getByTestId("EarthquakeForm-submit");

        fireEvent.change(distanceField, { target: { value: '12' } });
        fireEvent.change(magnitudeField, { target: { value: '0.9' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "distance": "12",
            "magnitude": "0.9",
        });


        expect(mockToast).toBeCalledWith("1 Earthquakes retrieved");
        expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });
    });


});