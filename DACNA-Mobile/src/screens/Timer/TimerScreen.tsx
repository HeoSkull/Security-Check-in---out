import { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import globalStyles from "@components/styles.css";

//redux
import { AppDispatch, RootState } from "@redux/store";

import { UserActions } from "@redux/user/UserSlice";
import { WorkdayActions } from "@redux/workday/WorkdaySlice";
import { GroupActions } from "@redux/group/GroupSlice";
import { CheckOutActions } from "@redux/workday/CheckOutSlice";

//utils
import { convertStringToTimestamp } from "@utils/time";

//components
import ConfirmDialog from "@components/ComfirmDialog";

export default function TimerScreen({ route, navigation }: any) {
  const themeCustom = useTheme();
  const isRefresh = route.params?.isRefresh;

  const [timer, setTimer] = useState<string>("");
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const [comfirmDialogVisible, setComfirmDialogVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const workday = useSelector((state: RootState) => state.workday.workday);
  const group = useSelector((state: RootState) => state.group.group);

  const { isCheckingOut, isCheckingSuccess, isCheckingError } = useSelector(
    (state: RootState) => state.checkout
  );

  const error = useSelector((state: RootState) => state.checkout.error);

  useEffect(() => {
    if (refresh) {
      dispatch(UserActions.getUserAsync());
      dispatch(WorkdayActions.getCurrentWorkdayAsync());
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (isRefresh) setRefresh(isRefresh);
  }, [isRefresh]);

  useEffect(() => {
    if (workday) {
      dispatch(GroupActions.getGroupAsync(workday.group_id));

      if (timerInterval) clearInterval(timerInterval);

      setTimerInterval(
        setInterval(() => {
          const tempTimer = convertStringToTimestamp(workday?.check_in);
          setTimer(tempTimer);
        }, 1000)
      );
    }
  }, [workday]);

  const handleOnConfirmCheckOut = () => {
    setComfirmDialogVisible(true);
  };

  const handleOnCheckOut = (id: string) => {
    dispatch(CheckOutActions.checkOutAsync(id));
  };

  const refreshState = () => {
    dispatch(CheckOutActions.refresh());
  };

  const refreshScreen = () => {
    setRefresh(true);
  };

  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.user_name}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>

      <View>
        {workday ? (
          <>
            <View style={styles.group_container}>
              <Text style={styles.text}>Currently working at group: </Text>
              <Text style={styles.group_name}>{group?.name}</Text>
            </View>
            <View style={styles.timer_container}>
              <Text style={styles.text}>You have been working for</Text>
              <Text style={[styles.timer, { color: themeCustom.colors.primary }]}> {timer}</Text>
            </View>
            <Button style={styles.button} mode="contained" onPress={handleOnConfirmCheckOut}>
              {isCheckingOut ? <ActivityIndicator animating={true} /> : "Check out"}
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.notCheckedIn}>
              You are not currently working. Scan the QR code to start working.
            </Text>
          </>
        )}
      </View>
      <Portal>
        <ConfirmDialog
          visible={comfirmDialogVisible}
          message="Are you sure you want to check out?"
          callback={(result: boolean) => {
            if (result) {
              handleOnCheckOut(workday!.id);
            }
            setComfirmDialogVisible(false);
          }}
        />

        <DialogError refreshState={refreshState} isCheckingError={isCheckingError} error={error} />
        <DialogSuccess
          refreshState={refreshState}
          refreshScreen={refreshScreen}
          isCheckingSuccess={isCheckingSuccess}
          navigation={navigation}
        />
      </Portal>
    </View>
  );
}

function DialogSuccess(props: any) {
  const { isCheckingSuccess, navigation, refreshState, refreshScreen } = props;

  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const showDialogSuccess = () => setVisibleSuccess(true);
  const hideDialogSuccess = () => setVisibleSuccess(false);

  useEffect(() => {
    if (isCheckingSuccess) {
      showDialogSuccess();
    }
  }, [isCheckingSuccess]);

  const handleOnCheckOutSuccess = () => {
    hideDialogSuccess();
    refreshState();
    refreshScreen();
    navigation.navigate("Home");
  };

  return (
    <Dialog visible={visibleSuccess} onDismiss={hideDialogSuccess}>
      <Dialog.Title>Success</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">You have checked out successfully</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleOnCheckOutSuccess}>Done</Button>
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

  const handleOnCheckOutError = () => {
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
        <Button onPress={handleOnCheckOutError}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
  },
  user_name: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  group_name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
  },
  group_container: {
    flexDirection: "column",
    marginTop: 20,
  },
  timer_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
  },
  notCheckedIn: {
    fontSize: 18,
    marginTop: 20,
    opacity: 0.5,
    textAlign: "center",
  },
});
