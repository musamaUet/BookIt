import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/roomActions';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router';

const Home = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	let { page = 1 } = router.query;
	page = Number(page);
	const { rooms, resPerPage, roomsCount, error } = useSelector(
		(state) => state.allRooms
	);

	useEffect(() => {
		toast.error(error);
		dispatch(clearErrors());
	}, []);

	const handlePagination = (pageNumber) => {
		console.log('pageNumber', pageNumber);
		window.location.href = `/?page=${pageNumber}`;
	};
	return (
		<React.Fragment>
			<section id='rooms' className='container mt-5'>
				<h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

				<a href='#' className='ml-2 back-to-search'>
					<i className='fa fa-arrow-left'></i> Back to Search
				</a>
				<div className='row'>
					{rooms && rooms.length === 0 ? (
						<div className='danger danger-alert'>
							<b>No Room.</b>
						</div>
					) : (
						rooms &&
						rooms.map((room) => <RoomItem key={room._id} room={room} />)
					)}
				</div>
			</section>
			{resPerPage < roomsCount && (
				<div className='d-flex justify-content-center mt-5'>
					<Pagination
						activePage={page}
						itemsCountPerPage={resPerPage}
						totalItemsCount={roomsCount}
						onChange={handlePagination}
						firstPageText={'First'}
						lastPageText={'Last'}
						itemClass='page-item'
						linkClass='page-link'
					/>
				</div>
			)}
		</React.Fragment>
	);
};

export default Home;
