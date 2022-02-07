import Layout from '../../components/layout/Layout';
import RoomDetails from '../../components/room/RoomDetails';
import { getRoomDetails } from '../../redux/actions/roomActions';
import { wrapper } from '../../redux/store';

function RoomDetailsPage() {
	return (
		<Layout>
			<RoomDetails title='Room Details' />
		</Layout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, params }) => {
			return await store.dispatch(getRoomDetails(req, params));
		}
);

export default RoomDetailsPage;
