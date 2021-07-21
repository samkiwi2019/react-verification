import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles';
import { useEffect } from 'react';
import { createCustomerByEmail, getVerificationCodeByEmail } from '../../api/customer';
import Countdown from '../../components/Countdown';
import { useSnackbar } from 'notistack';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            <span>Created by Sam </span>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(styles);

const EMAIL_GAP_SECONDS = 30;

const formDefault = {
    fullName: '',
    phone: '',
    email: '',
    vCode: '',
};

function RegisterPage() {
    const classes = useStyles();

    // ================================================================================
    // snackbar
    // ================================================================================
    const { enqueueSnackbar } = useSnackbar();
    const handleSnack = (variant, txt) => enqueueSnackbar(txt, { variant });
    // ================================================================================
    // default state and two ways bind function
    // ================================================================================
    const [form, setForm] = useState(formDefault);
    const handleInput = (e, key) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    // ================================================================================
    // countdown for getting vCode
    // ================================================================================

    const [isSending, setIsSending] = useState(false);
    const emailSleep = () => {
        setTimeout(() => {
            setIsSending(false);
        }, EMAIL_GAP_SECONDS * 1000);
    };
    // ================================================================================
    // To check the email if it is validated for keeping buttons status correct.
    // ================================================================================
    const validatorRef = useRef(null);
    const [isValidEmail, setIsValidEmail] = useState(false);

    useEffect(() => {
        setIsValidEmail(form.email && validatorRef?.current.childs[2].state.isValid && !isSending);
    }, [form, isSending]);

    // ================================================================================
    // To get a vcode
    // ================================================================================
    const handleGetVCode = async () => {
        try {
            setIsSending(true);
            const { data } = await getVerificationCodeByEmail(form.email);
            if (data.status === 200) {
                emailSleep();
                handleSnack('success', data.message);
            } else {
                handleSnack('warning', data.message);
                setIsSending(false);
            }
        } catch (error) {
            handleSnack('error', error ?? 'Network error, please try it later!');
            setIsSending(false);
        }
    };

    // ================================================================================
    // To submit form
    // ================================================================================
    let loading = false; // avoide multiple clicking
    const [evidence, setEvidence] = useState(null);
    const handleSubmit = async () => {
        try {
            if (loading) return;
            loading = true;
            const { data } = await createCustomerByEmail(form);
            if (data.status === 200) {
                handleSnack('success', data.message);
                setEvidence(JSON.stringify(data.data));
            } else {
                handleSnack('warning', data.message);
            }
            loading = false;
        } catch (error) {
            handleSnack('error', error ?? 'Network error, please try it later!');
            loading = false;
        }
    };

    return (
        <Container component='main' className='register-form' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <ValidatorForm className={classes.form} onSubmit={handleSubmit} ref={validatorRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                variant='outlined'
                                fullWidth
                                label='FullName'
                                name='fullName'
                                autoComplete='fullName'
                                autoFocus
                                value={form.fullName}
                                onChange={e => handleInput(e, 'fullName')}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                data-testid='fullName'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant='outlined'
                                fullWidth
                                label='phone'
                                name='phone'
                                autoComplete='phone'
                                value={form.phone}
                                onChange={e => handleInput(e, 'phone')}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                data-testid='phone'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant='outlined'
                                fullWidth
                                label='Email Address'
                                name='email'
                                value={form.email}
                                onChange={e => handleInput(e, 'email')}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                data-testid='email'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                autoComplete='verification code'
                                name='vCode'
                                variant='outlined'
                                fullWidth
                                label='Verification code'
                                size='small'
                                value={form.vCode}
                                onChange={e => handleInput(e, 'vCode')}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                data-testid='vCode'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type='button'
                                disabled={!isValidEmail}
                                fullWidth
                                variant='contained'
                                color='secondary'
                                className={classes.code}
                                onClick={handleGetVCode}
                                data-testid='vCodeBtn'>
                                {isSending ? (
                                    <Countdown seconds={EMAIL_GAP_SECONDS} />
                                ) : (
                                    'Get vCode'
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        data-testid='submitBtn'>
                        Sign Up
                    </Button>
                </ValidatorForm>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

            {!evidence ? null : (
                <Box mt={5}>
                    <p>Your information is as follows: </p>
                    <p>{evidence}</p>
                </Box>
            )}
        </Container>
    );
}

export default RegisterPage;
