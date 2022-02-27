import { render } from "@testing-library/react";
import UCSBSubjectsCreatePage from "main/pages/UCSBSubjects/UCSBSubjectsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

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

describe("UCSBSubjectsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const queryClient = new QueryClient();
    test("renders without crashing for admin user", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const UCSBSubject = {
            id: 17,
            subjectCode: "CMPCS",
            subjectTranslation: "subjectTranslation",
            deptCode: "deptCode",
            collegeCode: "collegeCode",
            relatedDeptCode: "relatedDeptCode",
            inactive: "inactive"
        };

        axiosMock.onPost("/api/ucsbsubjects/post").reply( 202, UCSBSubject);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("UCSBSubjectForm-subjectCode")).toBeInTheDocument();
        });

        const subjectCodeField = getByTestId("UCSBSubjectForm-subjectCode");
        const subjectTranslationField = getByTestId("UCSBSubjectForm-subjectTranslation");
        const deptCodeField = getByTestId("UCSBSubjectForm-deptCode");
        const collegeCodeField = getByTestId("UCSBSubjectForm-collegeCode");
        const relatedDeptCodeField = getByTestId("UCSBSubjectForm-relatedDeptCode");
        const inactiveField = getByTestId("UCSBSubjectForm-inactive");
        const submitButton = getByTestId("UCSBSubjectForm-submit");

        fireEvent.change(subjectCodeField, { target: { value: 'subjectCodeField' } });
        fireEvent.change(subjectTranslationField, { target: { value: 'subjectTranslationField' } });
        fireEvent.change(deptCodeField, { target: { value: 'deptCodeField' } });        
        fireEvent.change(collegeCodeField, { target: { value: 'collegeCodeField' } });
        fireEvent.change(relatedDeptCodeField, { target: { value: 'relatedDeptCodeField' } });
        fireEvent.change(inactiveField, { target: { value: 'inactiveField' } });   

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "subjectCode": "subjectCodeField",
                "subjectTranslation": "subjectTranslationField",
                "deptCode": "deptCodeField",
                "collegeCode": "collegeCodeField",
                "relatedDeptCode": "inactiveField",
                "inactive": "inactiveField"
            });      
            
        expect(mockToast).toBeCalledWith("New ucsbSubject Created - id: 17 name: subjectCodeField");
        expect(mockNavigate).toBeCalledWith({ "to": "/ucsbsubjects/list" });
    });
});


