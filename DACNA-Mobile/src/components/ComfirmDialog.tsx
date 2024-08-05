import { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export type ConfirmDialogProps = {
  visible: boolean;
  message: string;
  callback: (result: boolean) => void;
};

export default function ConfirmDialog(confirmDialogProps: ConfirmDialogProps) {
  const { visible, message, callback } = confirmDialogProps;

  const handleDismiss = () => {
    callback(false);
  };

  const handleConfirm = () => {
    callback(true);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>No</Button>
          <Button onPress={handleConfirm}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
