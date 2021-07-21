import { render, screen, cleanup, fireEvent, waitFor, act } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import Register from '../../pages/Register';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '../../config/config';
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

const server = setupServer(
    rest.post(`${baseUrl}/api/getVerificationCodeByEmail`, (req, res, ctx) => {
        return res(ctx.json({ message: 'successful', status: 200 }));
    }),
    rest.post(`${baseUrl}/api/createCustomerByEmail`, (req, res, ctx) => {
        return res(ctx.json({ message: 'successful', status: 200 }));
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    cleanup();
    server.resetHandlers();
});
afterAll(() => server.close());

it('should have 4 inputs with a correct name', () => {
    render(
        <SnackbarProvider>
            <Register />
        </SnackbarProvider>
    );
    const fullNameInputEl = screen.getAllByTestId('fullName');
    const phoneInputEl = screen.getAllByTestId('phone');
    const emailInputEl = screen.getAllByTestId('email');
    const vCodeInputEl = screen.getAllByTestId('vCode');
    expect(fullNameInputEl.length).toBe(1);
    expect(phoneInputEl.length).toBe(1);
    expect(emailInputEl.length).toBe(1);
    expect(vCodeInputEl.length).toBe(1);
});

it('should have 2 buttons with a correct name', () => {
    render(
        <SnackbarProvider>
            <Register />
        </SnackbarProvider>
    );
    const vCodeBtnEl = screen.getAllByTestId('vCodeBtn');
    const submitEl = screen.getAllByTestId('submitBtn');
    expect(vCodeBtnEl.length).toBe(1);
    expect(submitEl.length).toBe(1);
});

it('should 4 inputs have two way binding features', async () => {
    render(
        <SnackbarProvider>
            <Register />
        </SnackbarProvider>
    );
    const fullNameInputEl = screen.getByTestId('fullName').querySelector('input');
    fireEvent.change(fullNameInputEl, { target: { value: '1234' } });
    expect(fullNameInputEl.value).toBe('1234');

    const phoneInputEl = screen.getByTestId('phone').querySelector('input');
    fireEvent.change(phoneInputEl, { target: { value: '1234' } });
    expect(phoneInputEl.value).toBe('1234');

    const emailInputEl = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInputEl, { target: { value: '1234@123.com' } });
    expect(emailInputEl.value).toBe('1234@123.com');

    const vCodeInputEl = screen.getByTestId('vCode').querySelector('input');
    fireEvent.change(vCodeInputEl, { target: { value: '1234' } });
    expect(vCodeInputEl.value).toBe('1234');
});

it('should getVCode btn call an api and return successful', async () => {
    await act(async () => {
        render(
            <SnackbarProvider>
                <Register />
            </SnackbarProvider>
        );
    });

    // Set up a email for getting vCode
    const emailInputEl = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInputEl, { target: { value: '1234@123.com' } });
    expect(emailInputEl.value).toBe('1234@123.com');

    const vCodeBtnEl = screen.getByTestId('vCodeBtn');
    fireEvent.click(vCodeBtnEl);
    await waitFor(() => expect(screen.getByText('successful')).toBeTruthy());
});

it('should submit btn call an api and return successful', async () => {
    await act(async () => {
        render(
            <SnackbarProvider>
                <Register />
            </SnackbarProvider>
        );
    });

    // Set up form data for submit
    const fullNameInputEl = screen.getByTestId('fullName').querySelector('input');
    fireEvent.change(fullNameInputEl, { target: { value: '1234' } });
    expect(fullNameInputEl.value).toBe('1234');

    const phoneInputEl = screen.getByTestId('phone').querySelector('input');
    fireEvent.change(phoneInputEl, { target: { value: '1234' } });
    expect(phoneInputEl.value).toBe('1234');

    const emailInputEl = screen.getByTestId('email').querySelector('input');
    fireEvent.change(emailInputEl, { target: { value: '1234@123.com' } });
    expect(emailInputEl.value).toBe('1234@123.com');

    const vCodeInputEl = screen.getByTestId('vCode').querySelector('input');
    fireEvent.change(vCodeInputEl, { target: { value: '1234' } });
    expect(vCodeInputEl.value).toBe('1234');

    const submitEl = screen.getByTestId('submitBtn');
    fireEvent.click(submitEl);
    await waitFor(() => expect(screen.getByText('successful')).toBeTruthy());
});
