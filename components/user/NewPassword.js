import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ButtonLoader from '../layout/ButtonLoader';
import { clearErrors, resetPassword } from '../../redux/actions/userActions';

const NewPassword = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { error, loading, success } = useSelector(
		(state) => state.forgotPassword
	);

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		if (success) {
			router.push('/login');
		} else {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [error, success, loading]);

	const submitHandler = (e) => {
		e.preventDefault();
		const passwords = { password, confirmPassword };
		const { token } = router.query;
		dispatch(resetPassword(token, passwords));
	};
	return (
		<div className='row wrapper'>
			<div className='col-10 col-lg-5'>
				<form className='shadow-lg' onSubmit={submitHandler}>
					<h1 className='mb-3'>New Password</h1>

					<div className='form-group'>
						<label htmlFor='password_field'>Password</label>
						<input
							type='password'
							id='password_field'
							className='form-control'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='confirm_password_field'>Confirm Password</label>
						<input
							type='password'
							id='confirm_password_field'
							className='form-control'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<button
						id='new_password_button'
						type='submit'
						className='btn btn-block py-3'
					>
						{loading ? <ButtonLoader /> : 'Set Password'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewPassword;
