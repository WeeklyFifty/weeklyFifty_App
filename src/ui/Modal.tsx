// src/ui/Modal.tsx
// Stub modal wrapper. TODO(Phase C): focus trap, keyboard avoidance, backdrop press.

import type { ReactNode } from "react";
import { Modal as RNModal, View } from "react-native";

import { useTheme } from "@/theme/useTheme";

export interface ModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  testID?: string;
}

export function Modal({ visible, onRequestClose, children, testID }: ModalProps) {
  const t = useTheme();
  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
      animationType="fade"
      testID={testID}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: t.colors.overlay,
          justifyContent: "center",
          padding: t.spacing[4],
        }}
      >
        <View
          style={{
            backgroundColor: t.colors.surface,
            padding: t.spacing[4],
            borderRadius: t.radii.lg,
          }}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
}
