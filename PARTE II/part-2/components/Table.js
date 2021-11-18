import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteUser,
	fetchUsers,
	setModalOpen,
	setSelectedUser,
} from "@/store";
import { useEffect } from "react";

export function Table() {
	const state = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<table className="table-auto">
			<thead >
				<tr>
					<th>Full name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody>
				{state.userList.map(({ _id, name, email, address, phone }) => (
					<tr key={_id}>
						<td>{name}</td>
						<td>{email}</td>
						<td>{address}</td>
						<td>{phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedUser(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteUser(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
