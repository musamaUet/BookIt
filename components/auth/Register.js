import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import axios from 'axios';

const Register = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = user;
	const [avatar, setAvatar] = useState('');
	const [previewAvatar, setPreviewAvatar] = useState(
		'/images/default_avatar.jpeg'
	);

	const { success, error, loading } = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (success) {
			router.push('/login');
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, success, error]);

	const onChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatar(reader.result);
					setPreviewAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			name,
			email,
			password,
			avatar,
		};
		dispatch(registerUser(userData));
	};
	return (
		<div className='container container-fluid'>
			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form className='shadow-lg' onSubmit={handleSubmit}>
						<h1 className='mb-3'>Join Us</h1>

						<div className='form-group'>
							<label htmlFor='name_field'>Full Name</label>
							<input
								type='text'
								id='name_field'
								name='name'
								className='form-control'
								value={name}
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email_field'>Email</label>
							<input
								type='email'
								name='email'
								id='email_field'
								className='form-control'
								value={email}
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								name='password'
								className='form-control'
								value={password}
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='avatar_upload'>Avatar</label>
							<div className='d-flex align-items-center'>
								<div>
									<figure className='avatar mr-3 item-rtl'>
										<img
											src={previewAvatar}
											className='rounded-circle'
											alt='image'
										/>
									</figure>
								</div>
								<div className='custom-file'>
									<input
										type='file'
										name='avatar'
										className='custom-file-input'
										id='customFile'
										accept='images/*'
										onChange={onChange}
									/>
									<label className='custom-file-label' htmlFor='customFile'>
										Choose Avatar
									</label>
								</div>
							</div>
						</div>

						<button
							id='login_button'
							type='submit'
							className='btn btn-block py-3'
						>
							{loading ? <ButtonLoader /> : 'REGISTER'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
