import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import { GroupActions } from "@redux/groups/GroupsSlice";

//Model
import { Group } from "@models/Group.model";

//Components
import GroupCard from "./components/GroupCard";

export default function GroupsScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const groups = useSelector((state: RootState) => state.groups.groups);
  const isLoading = useSelector((state: RootState) => state.groups.loading);

  useEffect(() => {
    dispatch(GroupActions.getGroupListAsync());
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : groups.length === 0 ? (
        <Text>No groups found</Text>
      ) : (
        groups.map((group: Group, index: number) => <GroupCard key={index} group={group} />)
      )}
    </View>
  );
}
