import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, ActivityIndicator, Portal, Dialog } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import globalStyles from "@components/styles.css";

// Redux
import { AppDispatch, RootState } from "@redux/store";
import { GroupActions } from "@redux/group/GroupSlice";
import { CheckInActions } from "@redux/workday/CheckInSlice";

// Components
import ConfirmDialog from "@components/ComfirmDialog";

function DialogSuccess(props: any) {
  const { isCheckingSuccess, navigation, refreshState } = props;

  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const showDialogSuccess = () => setVisibleSuccess(true);
  const hideDialogSuccess = () => setVisibleSuccess(false);

  useEffect(() => {
    if (isCheckingSuccess) {
      showDialogSuccess();
    }
  }, [isCheckingSuccess]);

  const handleOnCheckInSuccess = () => {
    hideDialogSuccess();
    refreshState();
    navigation.navigate("Current", { isRefresh: true });
  };

  return (
    <Dialog visible={visibleSuccess} onDismiss={hideDialogSuccess}>
      <Dialog.Title>Success</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">You have checked in successfully</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleOnCheckInSuccess}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

function DialogError(props: any) {
  const { error, refreshState, isCheckingError } = props;

  const [visibleError, setVisibleError] = useState(false);
  const showDialogError = () => setVisibleError(true);
  const hideDialogError = () => setVisibleError(false);

  useEffect(() => {
    if (isCheckingError) {
      showDialogError();
    }
  }, [isCheckingError]);

  const handleOnCheckInError = () => {
    hideDialogError();
    refreshState();
  };

  return (
    <Dialog visible={visibleError} onDismiss={hideDialogError}>
      <Dialog.Title>Error</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{error}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleOnCheckInError}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default function CheckInScreen({ route, navigation }: any) {
  const { id } = route.params;

  const [comfirmVisible, setComfirmVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const group = useSelector((state: RootState) => state.group.group);

  const { isCheckingIn, isCheckingSuccess, isCheckingError } = useSelector(
    (state: RootState) => state.checkin
  );

  const error = useSelector((state: RootState) => state.checkin.error);

  useEffect(() => {
    dispatch(GroupActions.getGroupAsync(id));
  }, [id]);

  const handleOnComfirmCheckIn = () => {
    setComfirmVisible(true);
  };

  const handleOnCheckIn = () => {
    dispatch(CheckInActions.checkInAsync(id));
  };

  const refreshState = () => {
    dispatch(CheckInActions.refresh());
  };

  if (!id) {
    return (
      <View style={globalStyles.container}>
        <Text>Invalid QR</Text>
        <Button>Back</Button>
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { justifyContent: "center" }]}>
      {!group && <Text>Loading...</Text>}
      {group && (
        <>
          <Text style={styles.textGroup}>{group.name}</Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleOnComfirmCheckIn}
            disabled={isCheckingIn}
          >
            {isCheckingIn ? <ActivityIndicator animating={true} /> : "Check in"}
          </Button>
          <Portal>
            <ConfirmDialog
              visible={comfirmVisible}
              message="Are you sure you want to check in?"
              callback={(result: boolean) => {
                if (result) {
                  handleOnCheckIn();
                }
                setComfirmVisible(false);
              }}
            />
            <DialogError
              refreshState={refreshState}
              isCheckingError={isCheckingError}
              error={error}
            />
            <DialogSuccess
              refreshState={refreshState}
              isCheckingSuccess={isCheckingSuccess}
              navigation={navigation}
            />
          </Portal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textGroup: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
