import { configureStore } from "@reduxjs/toolkit";

// User and Auth
import UserReducer from "./user/UserSlice";
import AuthReducer from "./auth/AuthSlice";

// Group
import GroupReducer from "./group/GroupSlice";
import GroupsReducer from "./groups/GroupsSlice";

//Workday
import WorkdayReducer from "./workday/WorkdaySlice";
import CheckInReducer from "./workday/CheckInSlice";
import CheckOutReducer from "./workday/CheckOutSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    auth: AuthReducer,

    //Group
    group: GroupReducer,
    groups: GroupsReducer,

    //Workday
    workday: WorkdayReducer,
    checkin: CheckInReducer,
    checkout: CheckOutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
