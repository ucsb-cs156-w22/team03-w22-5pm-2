import { fireEvent, queryByTestId, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBSubjectsEditPage from "main/pages/UCSBSubjects/UCSBSubjectsEditPage";

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
        useParams: () => ({
            id: 1
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBSubjectsEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBsubjects", { params: { id: 1 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {
            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBSubjectsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit UCSBSubject")).toBeInTheDocument());
            expect(queryByTestId("UCSBSubjectsForm-subjectCode")).not.toBeInTheDocument();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBSubjects", { params: { id: 17 } }).reply(200, {
                id: 1,
                subjectCode: "1A",
                subjectTranslation: "1B",
                deptCode: "1C",
                collegeCode: "1D",
                relatedDeptCode: "1E",
                inactive: "true"
            });
            axiosMock.onPut('/api/ucsbdates').reply(200, {
                id: "1",
                subjectCode: "1a",
                subjectTranslation: "1b",
                deptCode: "1c",
                collegeCode: "1d",
                relatedDeptCode: "1e",
                inactive: "false"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBSubjectsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBSubjectsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => {
                expect(getByTestId("UCSBSubjectsForm-subjectCode")).toBeInTheDocument();
            });
    
            const idField = getByTestId("UCSBSubjectsForm-id");
            const subjectCodeField = getByTestId("UCSBSubjectsForm-subjectCode");
            const subjectTranslationField = getByTestId("UCSBSubjectsForm-subjectTranslation");
            const deptCodeField = getByTestId("UCSBSubjectsForm-deptCode");
            const collegeCodeField = getByTestId("UCSBSubjectsForm-collegeCode");
            const relatedDeptCodeField = getByTestId("UCSBSubjectsForm-relatedDeptCode");
            const inactiveFieled=getByTestId("UCSBSubjectsForm-inactive");
            const submitButton = getByTestId("UCSBSubjectsForm-submit");

            expect(idField).toHaveValue("1");
            expect(subjectCodeField).toHaveValue("1A");
            expect(subjectTranslationField).toHaveValue("1B");
            expect(deptCodeField).toHaveValue("1C"); 
            expect(collegeCodeField).toHaveValue("1D");
            expect(relatedDeptCodeField).toHaveValue("1E");
            expect(inactiveFieled).toHaveValue("true");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBSubjectsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => {
                expect(getByTestId("UCSBSubjectsForm-subjectCode")).toBeInTheDocument();
            });

            const idField = getByTestId("UCSBSubjectsForm-id");
            const subjectCodeField = getByTestId("UCSBSubjectsForm-subjectCode");
            const subjectTranslationField = getByTestId("UCSBSubjectsForm-subjectTranslation");
            const deptCodeField = getByTestId("UCSBSubjectsForm-deptCode");
            const collegeCodeField = getByTestId("UCSBSubjectsForm-collegeCode");
            const relatedDeptCodeField = getByTestId("UCSBSubjectsForm-relatedDeptCode");
            const inactiveFieled=getByTestId("UCSBSubjectsForm-inactive");
            const submitButton = getByTestId("UCSBSubjectsForm-submit");

            expect(idField).toHaveValue("1");
            expect(subjectCodeField).toHaveValue("1A");
            expect(subjectTranslationField).toHaveValue("1B");
            expect(deptCodeField).toHaveValue("1C"); 
            expect(collegeCodeField).toHaveValue("1D");
            expect(relatedDeptCodeField).toHaveValue("1E");
            expect(inactiveFieled).toHaveValue("true");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(subjectCodeField, { target: { value: '1a' } })
            fireEvent.change(subjectTranslationField, { target: { value: '1b' } })
            fireEvent.change(deptCodeField, { target: { value: "1c" } })
            fireEvent.change(collegeCodeField, { target: { value: '1d' } })
            fireEvent.change(relatedDeptCodeField, { target: { value: '1e' } })
            fireEvent.change(inactiveFieled, { target: { value: 'false' } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("UCSBSubject Updated - id: 1 subject code: 1a");
            expect(mockNavigate).toBeCalledWith({ "to": "/UCSBSubjects/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 1 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                subjectCode: "1a",
                subjectTranslation: "1b",
                deptCode: "1c",
                collegeCode: "1d",
                relatedDeptCode: "1e",
                inactive: "false"
            })); // posted object

        });

       
    });
});

