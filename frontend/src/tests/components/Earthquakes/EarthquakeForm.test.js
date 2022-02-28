import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { earthquakesFixtures } from "fixtures/earthquakesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("EarthquakeForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Distance/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Retrieve/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a Earthquake ", async () => {

        var eqQuery = {"distance":"3", "minMag":"3.86"};

        const { getByText, getByTestId } = render(
            <Router  >
                <EarthquakeForm initialEarthquake={eqQuery} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/EarthquakeForm-mag/)).toBeInTheDocument());
        expect(getByText(/Minimum Magnitude/)).toBeInTheDocument();
        expect(getByTestId(/EarthquakeForm-mag/)).toHaveValue("3.86");
    });

/*
    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());
        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.change(quarterYYYYQField, { target: { value: 'bad-input' } });
        fireEvent.change(localDateTimeField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/QuarterYYYYQ must be in the format YYYYQ/)).toBeInTheDocument());
        expect(getByText(/localDateTime must be in ISO format/)).toBeInTheDocument();
    });
*/
    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("EarthquakeForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Distance is required./)).toBeInTheDocument());
        expect(getByText(/Minimum Magnitude is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <EarthquakeForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-distance")).toBeInTheDocument());

        const distanceField = getByTestId("EarthquakeForm-distance");
        const magField = getByTestId("EarthquakeForm-mag");
        const submitButton = getByTestId("EarthquakeForm-submit");

        fireEvent.change(distanceField, { target: { value: '1.1' } });
        fireEvent.change(magField, { target: { value: '2.2' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("EarthquakeForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


