import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { signOut } from 'next-auth/react';

const Header = () => {
	const dispatch = useDispatch();
	const loadedUser = useSelector((state) => state.loadedUser);
	const { user, loading } = loadedUser;

	useEffect(() => {
		if (!user) dispatch(loadUser());
	}, [dispatch, user]);

	const logoutHandler = () => {
		signOut();
	};
	return (
		<nav className='navbar row justify-content-center sticky-top'>
			<div className='container'>
				<div className='col-3 p-0'>
					<div className='navbar-brand'>
						<Link href='/'>
							<a>
								<img
									style={{ cursor: 'pointer' }}
									src='/images/bookit_logo.png'
									alt='BookIT'
								/>
							</a>
						</Link>
					</div>
				</div>

				<div className='col-3 mt-3 mt-md-0 text-center'>
					{user ? (
						<div className='ml-4 dropdown d-line'>
							<a
								className='btn dropdown-toggle mr-4'
								id='dropDownMenuButton'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								<figure>
									<img
										width={'50px'}
										height={'50px'}
										src={user.avatar && user.avatar.url}
										alt={user && user.name}
										className='rounded-circle'
									/>
								</figure>
								<span>{user && user.name}</span>
							</a>
							<div
								className='dropdown-menu'
								aria-labelledby='dropDownMenuButton'
							>
								{user && user.role === 'admin' && (
									<Fragment>
										<Link href='/admin/rooms'>
											<a className='dropdown-item'>Rooms</a>
										</Link>
										<Link href='/admin/bookings'>
											<a className='dropdown-item'>Bookings</a>
										</Link>
										<hr />
									</Fragment>
								)}
								<Link href='/bookings/me'>
									<a className='dropdown-item'>My Bookings</a>
								</Link>
								<Link href='/me/update'>
									<a className='dropdown-item'>Profile</a>
								</Link>
								<Link href='/'>
									<a
										className='dropdown-item text-danger'
										onClick={logoutHandler}
									>
										Logout
									</a>
								</Link>
							</div>
						</div>
					) : (
						!loading && (
							<Link href='/login'>
								<a className='btn btn-danger px-4 text-white login-header-btn float-right'>
									Login
								</a>
							</Link>
						)
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
