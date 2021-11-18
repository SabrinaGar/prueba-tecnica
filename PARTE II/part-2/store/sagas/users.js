import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchUsers() {
	try {
		const response = yield fetch("/api/Users");

		const userList = yield response.json();

		yield put({
			type: t.USER_FETCH_SUCCEEDED,
			payload: userList.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchUsers() {
	yield takeLatest(t.USER_FETCH_REQUESTED, fetchUsers);
}

function* addUser(action) {
	try {
		const response = yield fetch("/api/Users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newUser = yield response.json();

		yield put({
			type: t.USER_ADD_SUCCEEDED,
			payload: newUser.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddUser() {
	yield takeLatest(t.USER_ADD_REQUESTED, addUSER);
}

function* deleteUser(action) {
	try {
		const response = yield fetch("/api/users/" + action.payload, {
			method: "DELETE",
		});

		const deletedUser= yield response.json();

		yield put({
			type: t.USER_DELETE_SUCCEEDED,
			payload: deletedUser.data.id,
		});
	} catch (error) {
		yield put({
			type: t.USER_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveUser() {
	yield takeLatest(t.USER_DELETE_REQUESTED, deleteUSER);
}

function* updateUser(action) {
	try {
		const response = yield fetch("/api/users/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedUser = yield response.json();

		yield put({
			type: t.USER_UPDATE_SUCCEEDED,
			payload: updatedUser.data,
		});
	} catch (error) {
		yield put({
			type: t.USER_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateUser() {
	yield takeLatest(t.USER_UPDATE_REQUESTED, updateUser);
}

export default function* rootSaga() {
	yield all([
		watchFetchUsers(),
		watchAddUser(),
		watchRemoveUser(),
		watchUpdateUser(),
	]);
}
