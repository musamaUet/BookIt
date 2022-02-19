import React, { useEffect } from 'react';
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
					<Link href='/login'>
						<a className='btn btn-danger px-4 text-white login-header-btn float-right'>
							Login
						</a>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Header;
