import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function EarthquakeForm({ initialEarthquake, submitAction, buttonLabel="Retrieve" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialEarthquake || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    //const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    //const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="distance">Distance</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-distance"
                    id="distance"
                    type="text"
                    isInvalid={Boolean(errors.distance)}
                    {...register("distance", { required: "Distance is required." })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.distance?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="mag">Minimum Magnitude</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-mag"
                    id="minMag"
                    type="text"
                    isInvalid={Boolean(errors.minMag)}
                    {...register("minMag", {
                        required: "Minimum Magnitude is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.minMag?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit" //potential
                data-testid="EarthquakeForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="EarthquakeForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default EarthquakeForm;
