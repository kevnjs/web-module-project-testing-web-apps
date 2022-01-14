import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument;
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    //Act
    //Assert
    render(<ContactForm/>)
    const firstName = screen.getByPlaceholderText("Edd")
    const inputErr = "abcd"

    userEvent.type(firstName, inputErr)

    // console.log(firstName)
    expect(screen.getByText("Error: firstName must have at least 5 characters.")).toBeInTheDocument()


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByPlaceholderText("Edd")
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com")
    const submit = screen.getByRole('button')

    expect(firstName.value).toBe("")
    expect(lastName.value).toBe("")
    expect(email.value).toBe("")

    userEvent.click(submit)

    expect(screen.getByText("Error: firstName must have at least 5 characters.")).toBeInTheDocument()
    expect(screen.getByText("Error: lastName is a required field.")).toBeInTheDocument()
    expect(screen.getByText("Error: email must be a valid email address.")).toBeInTheDocument()
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByPlaceholderText("Edd")
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com")
    const submit = screen.getByRole('button')

    
    userEvent.type(firstName, "Edward")
    userEvent.type(lastName, "Elric")
    expect(email.value).toBe("")
    userEvent.click(submit)

    expect(screen.queryByText("Error: firstName must have at least 5 characters.")).toBeNull()
    expect(screen.queryByText("Error: lastName is a required field.")).toBeNull()
    expect(screen.getByText("Error: email must be a valid email address.")).toBeInTheDocument()

    

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com")
    userEvent.type(email, "email")
    expect(screen.getByText("Error: email must be a valid email address.")).toBeInTheDocument()

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const lastName = screen.getByPlaceholderText("Burke")
    const submit = screen.getByRole('button')
    expect(lastName.value).toBe("")
    userEvent.click(submit)
    expect(screen.queryByText("Error: lastName is a required field.")).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByPlaceholderText("Edd")
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com")
    const submit = screen.getByRole('button')

    expect(screen.queryByText("You Submitted:")).toBeNull()

    userEvent.type(firstName, "Edward")
    userEvent.type(lastName, "Elric")
    userEvent.type(email, "edward@alchemail.com")
    userEvent.click(submit)

    expect(screen.getByText("You Submitted:")).toBeInTheDocument();
    expect(screen.getByTestId("firstnameDisplay"))
    expect(screen.getByTestId("lastnameDisplay"))
    expect(screen.getByTestId("emailDisplay"))


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByPlaceholderText("Edd")
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com")
    const submit = screen.getByRole('button')

    userEvent.type(firstName, "Edward")
    userEvent.type(lastName, "Elric")
    userEvent.type(email, "edward@alchemail.com")
    userEvent.click(submit)

    expect(screen.getByText("You Submitted:")).toBeInTheDocument();
    expect(screen.getByTestId("firstnameDisplay"))
    expect(screen.getByTestId("lastnameDisplay"))
    expect(screen.getByTestId("emailDisplay"))
});